import { IOTPRepository } from "../../../domain/repositories/otp-repository.interface";
import { IUserRepository } from "../../../domain/repositories/user-repository.interface";
import { JwtService } from "../../../infrastructure/security/jwt";

export class VerifyOtpUseCase {
  constructor(
    private otpRepository: IOTPRepository,
    private tokenService: JwtService,
    private userRepo: IUserRepository,
  ) {}

  async execute(token: string, code: string): Promise<boolean> {
    const payload = await this.tokenService.verifyEmailToken(token);
    if (!payload) throw new Error("jwt error");
    const otp = await this.otpRepository.find(payload.email, code);
    if (!otp) {
      throw new Error("Invalid OTP");
    }

    if (otp.isExpired()) {
      throw new Error("OTP expired");
    }

    await this.userRepo.verifyUser(payload.email);

    await this.otpRepository.delete(payload.email);

    return true;
  }
}
