import jwt from "jsonwebtoken";
import { EmailPayload, IJwtService, JwtPayload } from "../../domain/repositories/jwt-token-repository.interface";



export class JwtService implements IJwtService {
  constructor(
    private accessSecret: string,
    private refreshSecret: string,
    private emailSecret:string
  ) {}

  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.accessSecret, { expiresIn: "15m" });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: "7d" });
  }
  generateEmailToken(payload: EmailPayload): string {
    return jwt.sign(payload, this.emailSecret, { expiresIn: "10m" });
  }

  verifyAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.accessSecret) as JwtPayload;
    } catch {
      return null;
    }
  }

  verifyRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.refreshSecret) as JwtPayload;
    } catch {
      return null;
    }
  }
  verifyEmailToken(token: string): EmailPayload | null {
    try {
      return jwt.verify(token, this.emailSecret) as EmailPayload;
    } catch {
      return null;
    }
  }
}