import { IPasswordHasher } from "../../../domain/repositories/password-hasher.interface";
import { ICompanyRepository } from "../../../domain/repositories/company-repository.interface";
import { RegisterRequest } from "./register-company-request.dto";
import { RegisterResponseDTO } from "./register-company-response.dto";
import { IUserRepository } from "../../../domain/repositories/user-repository.interface";
import { ConflictError } from "../../errors/conflict.error";

export class companyRegisterUseCase{

    constructor( private companyRepo:ICompanyRepository,
        private userRepo:IUserRepository,
            private passwordHasher: IPasswordHasher,

    ){}

    async execute(data:RegisterRequest):Promise<RegisterResponseDTO>{
        const {name,email,password}=data

        let company=await this.companyRepo.findByEmail(email)

        if (company) throw new ConflictError("Company with this email already exists")
        
        const hashedPassword= await this.passwordHasher.hash(password)

            company = await this.companyRepo.create({
      name,email
    });
       const user=await this.userRepo.create({companyId:company.id,name,email,role:"ADMIN",password:hashedPassword})
      
        return {user:user,company:company}
    }
    
    
}