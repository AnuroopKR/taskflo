export interface JwtPayload {
  userId: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
  companyId:string;
}
export interface EmailPayload{
  email:string
}

export interface IJwtService {
  generateAccessToken(payload: JwtPayload): string;
  generateRefreshToken(payload: JwtPayload):string;
  generateEmailToken(payload:EmailPayload):string;
  verifyAccessToken(token: string): JwtPayload|null;
  verifyRefreshToken(token: string): JwtPayload|null;
  verifyEmailToken(Token:string):EmailPayload|null;

}
