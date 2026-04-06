import { IUserRepository } from "../../../domain/repositories/user-repository.interface";
import { NotFoundError } from "../../errors/notfound.error";

export class GetUserUseCase{
    constructor(
        private userRepo:IUserRepository
    ){}

    async execute(email:string){
        const user= await this.userRepo.findByEmail(email)
        if(!user) throw new NotFoundError("user not found")
        const userData=await this.userRepo.findByCompanyId(user.companyId)
        return userData
    }
}