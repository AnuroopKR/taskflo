import { companyRepositoryImpl } from "../infrastructure/database/repositories/company-repository.impl";
import { BcryptPasswordHasher } from "../infrastructure/security/password-hasher";
import { JwtService } from "../infrastructure/security/jwt";
import { companyRegisterUseCase } from "../application/company/register/register-company.use-case";
import { userRepositoryImpl } from "../infrastructure/database/repositories/user-repository.impl";
import { UserLoginUseCase } from "../application/user/login/login-user-use-case";

const companyRepo = new companyRepositoryImpl();
const userRepo = new userRepositoryImpl();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtService(   process.env.JWT_ACCESS_SECRET || "default_access_secret",
  process.env.JWT_REFRESH_SECRET || "default_refresh_secret");

export const registerUseCase = new companyRegisterUseCase(
  companyRepo,
  userRepo,
  passwordHasher
);

export const loginUserUseCase = new UserLoginUseCase(
  userRepo,
  passwordHasher,
  tokenService
);