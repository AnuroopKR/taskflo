import {
  RoleType as DomainRoleType,
  User,
} from "../../../domain/entities/User";
import { prisma } from "../../../config/prisma";
import {
  IUserRepository,
  userProps,
} from "../../../domain/repositories/user-repository.interface";
import { Prisma, RoleType as PrismaRoleType } from "../../../generated/prisma";
import { UserWithRelations } from "../../../application/company/get-user/get-user-response.dto";

type UserWithInclude = Prisma.UserGetPayload<{
  include: {
    projects: { include: { project: true } };
    assignedTasks: true;
    company: true;
  };
}>;

export class userRepositoryImpl implements IUserRepository {
  private mapToEntity(record: {
    id: string;
    companyId: string;
    name: string;
    email: string;
    role: PrismaRoleType;
    password: string | null;
  }): User {
    return new User(
      record.id,
      record.companyId,
      record.name,
      record.email,
      record.role as DomainRoleType,
      record.password ?? undefined,
    );
  }
  private mapToUserWithRelations(record: UserWithInclude): UserWithRelations {
  return {
    id: record.id,
    companyId: record.companyId,
    name: record.name,
    email: record.email,
    role: record.role,

    projects: record.projects.map((p: any) => p.project),

    tasks: record.assignedTasks,

    company: record.company,
  };
}
  async create(data: userProps): Promise<User> {
    const userRecord = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        companyId: data.companyId,
        password: data.password,
        role: data.role as PrismaRoleType,
      },
    });
    return this.mapToEntity(userRecord);
  }
async findById(id: string): Promise<UserWithRelations | null> {
  const userRecord = await prisma.user.findUnique({
    where: { id },
    include: {
      projects: {
        include: {
          project: true,
        },
      },
      assignedTasks: true,
      company: true,
    },
  });

  if (!userRecord) return null;

  return this.mapToUserWithRelations(userRecord);
}

  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({ where: { email } });
    return userRecord ? this.mapToEntity(userRecord) : null;
  }
  async updatePassword(email: string, password: string): Promise<void> {
    await prisma.user.update({
      where: { email: email },
      data: { password },
    });
  }
 async findByCompanyId(companyId: string):Promise<UserWithRelations[]> {
  const users = await prisma.user.findMany({
    where: { companyId },
    include: {
      projects: {
        include: {
          project: true,
        },
      },
      assignedTasks: true,
      company: true,
    },
  });

  console.log("DEBUG USERS:", JSON.stringify(users, null, 2));

  return users.map((user) => ({
    id: user.id,
    companyId:user.companyId,
    name: user.name,
    email: user.email,
    role: user.role,

    projects: user.projects.map((p) => p.project),
    tasks: user.assignedTasks,

    company: user.company, // 👈 check this
  }));
}
}
