import { RoleType as DomainRoleType, User } from "../../../domain/entities/User";
import { prisma } from "../../../config/prisma";
import {
  IUserRepository,
  userProps,
} from "../../../domain/repositories/user-repository.interface";
import { RoleType as PrismaRoleType} from "../../../generated/prisma/enums";

export class userRepositoryImpl implements IUserRepository{
  private mapToEntity(record: {
    id: string;
    companyId: string;
    name: string;
    email: string;
    role: PrismaRoleType;
    password:string|null;
  }): User {
  return new User(
    record.id,
    record.companyId,
    record.name,
    record.email,
    record.role as DomainRoleType,
    record.password??undefined,
  );
  }
  async create(data: userProps):Promise<User> {
    const userRecord = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        companyId: data.companyId,
        password:data.password,
        role: data.role as PrismaRoleType,

      },
    });
    return this.mapToEntity(userRecord);
  }
  async findById(id: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({ where: { id } });
    return userRecord ? this.mapToEntity(userRecord) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({ where: { email } });
    return userRecord ? this.mapToEntity(userRecord) : null;
  }
}
