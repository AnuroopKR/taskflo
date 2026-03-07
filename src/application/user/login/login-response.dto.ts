// src/dto/login-response.dto.ts
export interface LoginResponseDto {
  user: {
    id: string;
    companyId:string;
    email: string;
    name: string | null;
    role: "employee" | "admin";
  };
  accessToken: string;
  refreshToken: string;
}