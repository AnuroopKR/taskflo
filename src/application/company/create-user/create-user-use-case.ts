import { RoleType } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/user-repository.interface";
import { ConflictError } from "../../errors/conflict.error";
import { CreateUserRequest } from "./create-user-request.dto";
import { CreateUserResponse } from "./create-user-response.dto";

export class CreateUserUseCase{
    constructor(
        private userRepo:IUserRepository,
    ){}

    async execute(data:CreateUserRequest):Promise<CreateUserResponse>{
        
        const {name,email,companyId,role}=data
        let user=await this.userRepo.findByEmail(data.email)
        if(user) throw new ConflictError("user with this email already exist")
        
        user=await this.userRepo.create({name,email,companyId,role:role as RoleType })

        return user
    }
}