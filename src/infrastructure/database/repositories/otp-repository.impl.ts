import { prisma } from "../../../config/prisma";
import { OTP } from "../../../domain/entities/Otp";
import { IOTPRepository } from "../../../domain/repositories/otp-repository.interface";

export class OTPRepositoryImpl implements IOTPRepository {
  private mapToEntity(record: {
    email: string;
    code: string;
    expiresAt: Date;
  }): OTP {
    return new OTP(record.email, record.code, record.expiresAt);
  }

  async save(otp: OTP): Promise<void> {
    await prisma.oTP.create({
      data: {
        email: otp.email,
        code: otp.code,
        expiresAt: otp.expiresAt,
      },
    });
  }

  async find(email: string, code: string): Promise<OTP | null> {
    const record = await prisma.oTP.findFirst({
      where: { email, code },
    });

    return record ? this.mapToEntity(record) : null;
  }

  async delete(email: string): Promise<void> {
    await prisma.oTP.deleteMany({
      where: { email },
    });
  }
}
