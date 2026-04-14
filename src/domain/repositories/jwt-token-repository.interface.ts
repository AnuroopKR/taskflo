export interface JwtPayload {
  userId: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
  companyId:string;
}

export interface IJwtService {
  generateAccessToken(payload: JwtPayload): string;
  generateRefreshToken(payload: JwtPayload):string;
  verifyAccessToken(token: string): JwtPayload|null;
  verifyRefreshToken(token: string): JwtPayload|null;

}
