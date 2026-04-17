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
import { CreateTaskUseCase } from "../application/task/create-task/create-task-use-case";
import { TaskRepositoryImpl } from "../infrastructure/database/repositories/task-repository.impl";
import { UpdateTaskStatusUseCase } from "../application/task/change-status/update-status-use-case";
import { TaskStatusHistoryRepositoryImpl } from "../infrastructure/database/repositories/task-status-history-repository.impl";
import { CreateProjectUseCase } from "../application/project/create-project/create-project-use-case";
import { ProjectRepositoryImpl } from "../infrastructure/database/repositories/project-repository.impl";
import { SetpasswordUseCase } from "../application/auth/set-password/set-password-use-case";
import { GetUserUseCase } from "../application/company/get-user/get-user-usecase";
import { GetUserByIdUseCase } from "../application/user/get-user-by-id/get-user-byid-use-case";
import { GetProjectsUseCase } from "../application/project/get-project/get-project-use-case";
import { GetProjectByIdUseCase } from "../application/project/get-project-by-id/get-project-by-id-use-case";

const companyRepo = new companyRepositoryImpl();
const userRepo = new userRepositoryImpl();
const passwordHasher = new BcryptPasswordHasher();
const mailProvider=new NodemailerMailProvider()
const otpGenerator= new RandomOtpGenerator()
const otpRepo=new OTPRepositoryImpl()
const tokenService = new JwtService(   process.env.JWT_ACCESS_SECRET || "default_access_secret",
  process.env.JWT_REFRESH_SECRET || "default_refresh_secret");
const taskRepo=new TaskRepositoryImpl()
const statusRepo=new TaskStatusHistoryRepositoryImpl
const projectRepo=new ProjectRepositoryImpl

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

export const createTaskUseCase=new CreateTaskUseCase(
  taskRepo
)

export const updateStatusUseCase=new UpdateTaskStatusUseCase(
  taskRepo,
  statusRepo
)

export const createProjectUseCase=new CreateProjectUseCase(
  projectRepo
)

export const getProjectUseCase=new GetProjectsUseCase(
  projectRepo
)

export const getProjectByIdUseCase=new GetProjectByIdUseCase(
  projectRepo
)

export const setPasswordUseCase=new SetpasswordUseCase(
  otpRepo,
  userRepo
)

export const getUserUseCase=new GetUserUseCase(
  userRepo
)

export const getUserByIdUseCase=new GetUserByIdUseCase(
  userRepo
)