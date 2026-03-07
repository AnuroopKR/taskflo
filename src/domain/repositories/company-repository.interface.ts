import { Company } from "../entities/Company";

export type companyProps=Pick<Company,"name"|"plan"|"email">

export interface ICompanyRepository{
    create(data:companyProps):Promise<Company>
    findByEmail(email:string):Promise<Company|null>
}