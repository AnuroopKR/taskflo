import { IOTPRepository } from "../../../domain/repositories/otp-repository.interface"

 
 export class VerifyOtpUseCase{
    constructor(
            private otpRepository:IOTPRepository
    
    ){}

    async execute(email: string, code: string): Promise<boolean> {
    const otp = await this.otpRepository.find(email, code)

    if (!otp) {
      throw new Error("Invalid OTP")
    }

    if (otp.isExpired()) {
      throw new Error("OTP expired")
    }

    await this.otpRepository.delete(email)

    return true
  }
 }
 
 
 
 