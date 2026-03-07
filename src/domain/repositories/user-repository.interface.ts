import { User } from "../entities/User";

export type userProps=Pick<User,"name"|"companyId"|"email"|"role"|"password">

export interface IUserRepository{
    create(data:userProps):Promise<User>
    findByEmail(email:string):Promise<User|null>
}