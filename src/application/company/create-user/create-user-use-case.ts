import { OTP } from "../../../domain/entities/Otp";
import { RoleType } from "../../../domain/entities/User";
import { IMailProvider } from "../../../domain/repositories/mail-provider.interface";
import { IOtpGenerator } from "../../../domain/repositories/otp-generator.interface";
import { IOTPRepository } from "../../../domain/repositories/otp-repository.interface";
import { IUserRepository } from "../../../domain/repositories/user-repository.interface";
import { ConflictError } from "../../errors/conflict.error";
import { CreateUserRequest } from "./create-user-request.dto";
import { CreateUserResponse } from "./create-user-response.dto";

export class CreateUserUseCase {
  constructor(
    private userRepo: IUserRepository,
    private otpGenerator: IOtpGenerator,
    private otpRepository: IOTPRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
    console.log(111, data);
    const { name, email, companyId, role } = data;
    let user = await this.userRepo.findByEmail(data.email);
    if (user) throw new ConflictError("user with this email already exist");

    // Create user
    user = await this.userRepo.create({
      email,
      name,
      companyId,
      role: role as RoleType,
    });

    // Generate otp
    const code = this.otpGenerator.generate(6);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    const otp = new OTP(email, code, expiresAt);

    // store otp to db
    await this.otpRepository.save(otp);
    const link = `https://yourapp.com/create-account?email=${email}&otp=${code}`;

    const html = `<div style="font-family: Arial, sans-serif; padding:20px; background:#f5f5f5;">
    <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:8px">

      <h2 style="color:#333;">Create Your Account</h2>

      <p>Hello ${name || "User"},</p>

      <p>
        You requested to create an account. Click the button below to verify your
        email and complete the account setup.
      </p>

      <div style="text-align:center;margin:30px 0;">
        <a href="${link}"
          style="
            background:#4CAF50;
            color:white;
            padding:14px 22px;
            text-decoration:none;
            border-radius:6px;
            font-weight:bold;
            display:inline-block;
          ">
          Verify Email & Create Account
        </a>
      </div>

      <p style="color:#777;font-size:14px">
        This link will expire in <b>5 minutes</b>.
      </p>

      <p style="color:#777;font-size:13px;margin-top:30px">
        If you did not request this, please ignore this email.
      </p>

      <hr style="margin-top:30px"/>

      <p style="font-size:12px;color:#aaa">
        © ${new Date().getFullYear()} Your Company
      </p>

    </div>
  </div>`;

  // send link through email
    await this.mailProvider.sendMail({
      to: email,
      subject: "Your OTP Code",
      html: html,
    });
    return user;
  }
}
