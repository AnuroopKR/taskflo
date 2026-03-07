import bcrypt from "bcrypt";
import { IPasswordHasher } from "../../domain/repositories/password-hasher.interface";

export class BcryptPasswordHasher implements IPasswordHasher {

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}