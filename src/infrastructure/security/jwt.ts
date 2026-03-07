import jwt from "jsonwebtoken";
import { IJwtService, JwtPayload } from "../../domain/repositories/jwt-token-repository.interface";



export class JwtService implements IJwtService {
  constructor(
    private accessSecret: string,
    private refreshSecret: string
  ) {}

  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.accessSecret, { expiresIn: "15m" });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: "7d" });
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
}