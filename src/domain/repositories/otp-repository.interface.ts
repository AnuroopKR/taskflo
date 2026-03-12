import { OTP } from "../entities/Otp";

export interface IOTPRepository {
  save(otp: OTP): Promise<void>;
  find(email: string, code: string): Promise<OTP | null>;
  delete(email: string): Promise<void>;
}
