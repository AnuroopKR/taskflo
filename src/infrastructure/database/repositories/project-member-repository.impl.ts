// src/infrastructure/database/repositories/project-member.repository.impl.ts

import { prisma } from "../../../config/prisma";
import { IProjectMemberRepository } from "../../../domain/repositories/project-member-repository.interface";
import { ProjectMember } from "../../../domain/entities/ProjectMember";
import { ProjectMemberDTO } from "../../../application/project/get-members/project-member-response.dto";

export class ProjectMemberRepositoryImpl implements IProjectMemberRepository {
  private mapToEntity(record: any): ProjectMember {
    return new ProjectMember(
      record.id,
      record.userId,
      record.projectId,
      record.role ?? undefined,
    );
  }

  async addMembers(projectId: number, userIds: string[]): Promise<void> {
    await prisma.projectMember.createMany({
      data: userIds.map((userId) => ({
        projectId,
        userId,
      })),
      skipDuplicates: true, // ✅ important
    });
  }

  async removeMember(projectId: number, userId: string): Promise<void> {
    await prisma.projectMember.delete({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });
  }

async findByProjectId(projectId: number): Promise<ProjectMemberDTO[]> {
  const records = await prisma.projectMember.findMany({
    where: { projectId },
    include: { user: true },
  });

  return records.map((record) => ({
    id: record.id,
    user: {
      id: record.user.id,
      name: record.user.name,
      email: record.user.email,
    },
  }));
}
}
