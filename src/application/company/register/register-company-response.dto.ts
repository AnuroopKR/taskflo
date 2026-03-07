export interface RegisterResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
    companyId:string;
    role: string;
  };
  company: {
    id: string;
    name: string;
    email:string;
    plan?:string;
  };
  // accessToken: string;
  // refreshToken: string;
}
