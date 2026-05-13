// domain/dtos/user-with-relations.dto.ts

export type UserWithRelations = {
  id: string;
  companyId: string;
  name: string;
  email: string;
  role: string;
  isVerified:boolean;
  projects: any[];
  tasks: any[];
  company: any;
};
