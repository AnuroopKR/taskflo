import { IOTPRepository } from "../../../domain/repositories/otp-repository.interface";
import { IPasswordHasher } from "../../../domain/repositories/password-hasher.interface";
import { IUserRepository } from "../../../domain/repositories/user-repository.interface";
import { UnauthorizedError } from "../../errors/auth.error";
import { NotFoundError } from "../../errors/notfound.error";
import { CreateUserPasswordRequest } from "./create-user-password-request";

export class CreateUserPasswordUseCase {
  constructor(
    private otpRepo: IOTPRepository,
    private userRepo: IUserRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  async execute(data: CreateUserPasswordRequest) {
    const { email, otp, password } = data;
    const otpdata = await this.otpRepo.find(email, otp);

    if (!otpdata) {
      throw new UnauthorizedError("otp expared or not found");
    }
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }
    const hashedPassword = await this.passwordHasher.hash(password);

    await this.userRepo.updatePassword(email, hashedPassword);
    await this.otpRepo.delete(email);
  }
}
