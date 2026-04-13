import { UserWithRelations } from "../../application/company/get-user/get-user-response.dto";
import { User } from "../entities/User";

export type userProps = Pick<
  User,
  "name" | "companyId" | "email" | "role" | "password"
>;

export interface IUserRepository {
  create(data: userProps): Promise<User>;
  findById(id:string):Promise<UserWithRelations|null>
  findByEmail(email: string): Promise<User | null>;
  updatePassword(email: string, password: string): Promise<void>;
  findByCompanyId(companyId: string): Promise<UserWithRelations[]>;

}
