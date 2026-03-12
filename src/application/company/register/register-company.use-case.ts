import { IPasswordHasher } from "../../../domain/repositories/password-hasher.interface";
import { ICompanyRepository } from "../../../domain/repositories/company-repository.interface";
import { RegisterRequest } from "./register-company-request.dto";
import { RegisterResponseDTO } from "./register-company-response.dto";
import { IUserRepository } from "../../../domain/repositories/user-repository.interface";
import { ConflictError } from "../../errors/conflict.error";
import { IMailProvider } from "../../../domain/repositories/mail-provider.interface";
import { IOtpGenerator } from "../../../domain/repositories/otp-generator.interface";
import { IOTPRepository } from "../../../domain/repositories/otp-repository.interface";
import { OTP } from "../../../domain/entities/Otp";

export class companyRegisterUseCase {
  constructor(
    private companyRepo: ICompanyRepository,
    private userRepo: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private mailProvider: IMailProvider,
    private otpGenerator: IOtpGenerator,
    private otpRepository: IOTPRepository,
  ) {}

  async execute(data: RegisterRequest): Promise<RegisterResponseDTO> {
    const { name, email, password } = data;

    let company = await this.companyRepo.findByEmail(email);

    if (company)
      throw new ConflictError("Company with this email already exists");

    const hashedPassword = await this.passwordHasher.hash(password);

    company = await this.companyRepo.create({
      name,
      email,
    });
    const user = await this.userRepo.create({
      companyId: company.id,
      name,
      email,
      role: "ADMIN",
      password: hashedPassword,
    });

    const code = this.otpGenerator.generate(6);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    const otp = new OTP(email, code, expiresAt);

    await this.otpRepository.save(otp);
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f7; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 20px; text-align: center; }
        .logo { max-width: 150px; margin-bottom: 20px; }
        h1 { color: #333; }
        p { color: #555; line-height: 1.5; }
        .otp-code { font-size: 28px; font-weight: bold; color: #2a9d8f; letter-spacing: 4px; margin: 20px 0; }
        .footer { font-size: 12px; color: #999; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <img src="[Your_Logo_URL]" alt="[Company Name]" class="logo">
        <h1>Verify Your Account</h1>
        <p>Hi ${name},</p>
        <p>We received a request to access your account. Use the OTP below to complete your verification:</p>
        <div class="otp-code">${otp}</div>
        <p>This code is valid for <strong>3 minutes</strong>. Please do not share it with anyone.</p>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <div class="footer">&copy; ${new Date().getFullYear()} [Company Name]. All rights reserved.</div>
      </div>
    </body>
    </html>`;

    // Send OTP email
    await this.mailProvider.sendMail({
      to: email,
      subject: "Your OTP Code",
      html: html,
    });

    console.log("otp", otp);
    return { user: user, company: company, otp: code };
  }
}
