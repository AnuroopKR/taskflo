import { IOTPRepository } from "../../../domain/repositories/otp-repository.interface";
import { IUserRepository } from "../../../domain/repositories/user-repository.interface";
import { SetPasswordRequestDto } from "./set-password-request.dto";

export class SetpasswordUseCase{
    constructor(
        private otpRepository:IOTPRepository,
        private userRepo:IUserRepository
    ){}

    async execute(data:SetPasswordRequestDto){
        const {email,otp,password}=data
        const code=otp
        const otpData = await this.otpRepository.find(email, code)

            if (!otpData) {
      throw new Error("Invalid OTP")
    }

    if (otpData.isExpired()) {
      throw new Error("OTP expired")
    }
        const changedPassword=await this.userRepo.updatePassword(email,password)

        await this.otpRepository.delete(email)

        return true
    }
}