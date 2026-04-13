import { IUserRepository } from "../../../domain/repositories/user-repository.interface";

export class GetUserByIdUseCase{
    constructor(private userRepo:IUserRepository){}

    async execute(id:string){
        const user=await this.userRepo.findById(id)
        return user
    }
}