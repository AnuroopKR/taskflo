import {prisma} from "../../../config/prisma"
import { Company, CompanyPlan } from "../../../domain/entities/Company"
import {companyProps, ICompanyRepository} from "../../../domain/repositories/company-repository.interface"

export class companyRepositoryImpl implements ICompanyRepository{
private mapToEntity(record: {
  id: string
  name: string
  email: string
  plan?: string

}): Company {
  return new Company(
    record.id,
    record.name,
    record.email,
    record.plan as CompanyPlan
  )
}
    async create (data:companyProps){
        const companyRecord= await prisma.company.create({
            data:{name:data.name,email:data.email,plan:data.plan}
        })
    return this.mapToEntity(companyRecord)

}
  async findById(id: string): Promise<Company | null> {
    const companyRecord = await prisma.company.findUnique({ where: { id } })
    return companyRecord ? this.mapToEntity(companyRecord) : null
  }

    async findByEmail(email: string): Promise<Company | null> {
    const companyRecord = await prisma.company.findUnique({ where: { email } })
    return companyRecord ? this.mapToEntity(companyRecord) : null
  }
    }

    