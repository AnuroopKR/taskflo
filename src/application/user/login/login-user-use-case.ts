import { IJwtService } from "../../../domain/repositories/jwt-token-repository.interface";
import { IPasswordHasher } from "../../../domain/repositories/password-hasher.interface";
import { IUserRepository } from "../../../domain/repositories/user-repository.interface";
import { UnauthorizedError } from "../../errors/auth.error";
import { NotFoundError } from "../../errors/notfound.error";
import { LoginResponseDto } from "./login-response.dto";
import { LoginRequest } from "./login-user-request.dto";

export class UserLoginUseCase{
    constructor(
        private userRepo:IUserRepository,
        private passwordHasher: IPasswordHasher,
        private tokenService:IJwtService
    ){}

    async execute(data:LoginRequest):Promise<LoginResponseDto>{
        const {email,password}=data
        const user=await this.userRepo.findByEmail(email)
        if(!user) throw new NotFoundError("user not found")
        const isMatch=await this.passwordHasher.compare(password,user.password)
        if(!isMatch) throw new UnauthorizedError("invalied credential")
        
        const accessToken=this.tokenService.generateAccessToken({userId:user.id,email:user.email,role:user.role})
        const refreshToken=this.tokenService.generateRefreshToken({userId:user.id,email:user.email,role:user.role})

        return {user:{
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase() as "admin" | "employee",
      companyId: user.companyId,
    },
accessToken, refreshToken}
    }
}