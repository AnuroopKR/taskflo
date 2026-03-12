import { companyRepositoryImpl } from "../infrastructure/database/repositories/company-repository.impl";
import { BcryptPasswordHasher } from "../infrastructure/security/password-hasher";
import { JwtService } from "../infrastructure/security/jwt";
import { companyRegisterUseCase } from "../application/company/register/register-company.use-case";
import { userRepositoryImpl } from "../infrastructure/database/repositories/user-repository.impl";
import { UserLoginUseCase } from "../application/user/login/login-user-use-case";
import { RandomOtpGenerator } from "../infrastructure/security/otp-generator";
import { NodemailerMailProvider } from "../infrastructure/mail/nodemailer-mail.provider";
import { OTPRepositoryImpl } from "../infrastructure/database/repositories/otp-repository.impl";
import { VerifyOtpUseCase } from "../application/auth/verify-otp/verify-otp-use-case";
import { CreateUserUseCase } from "../application/company/create-user/create-user-use-case";
import { CreateUserPasswordUseCase } from "../application/user/create-user-password/create-user-password-use-case";

const companyRepo = new companyRepositoryImpl();
const userRepo = new userRepositoryImpl();
const passwordHasher = new BcryptPasswordHasher();
const mailProvider=new NodemailerMailProvider()
const otpGenerator= new RandomOtpGenerator()
const otpRepo=new OTPRepositoryImpl()
const tokenService = new JwtService(   process.env.JWT_ACCESS_SECRET || "default_access_secret",
  process.env.JWT_REFRESH_SECRET || "default_refresh_secret");

export const registerUseCase = new companyRegisterUseCase(
  companyRepo,
  userRepo,
  passwordHasher,
  mailProvider,
  otpGenerator,
  otpRepo
);

export const loginUserUseCase = new UserLoginUseCase(
  userRepo,
  passwordHasher,
  tokenService
);

export const verifyOtpUseCase=new VerifyOtpUseCase(
  otpRepo
)

export const createUserUSEcase=new CreateUserUseCase(
  userRepo,
  otpGenerator,
  otpRepo,
   mailProvider,
)

export const createUserPassword=new CreateUserPasswordUseCase(
  otpRepo,
  userRepo,
  passwordHasher
)