import { IOtpGenerator } from "../../domain/repositories/otp-generator.interface";

export class RandomOtpGenerator implements IOtpGenerator {
  generate(length: number = 6): string {
    let otp = "";

    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    return otp;
  }
}
