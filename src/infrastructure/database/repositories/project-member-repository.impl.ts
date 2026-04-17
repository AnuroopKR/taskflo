// src/infrastructure/database/repositories/project-member.repository.impl.ts

import { prisma } from "../../../config/prisma";
import { IProjectMemberRepository } from "../../../domain/repositories/project-member-repository.interface";
import { ProjectMember } from "../../../domain/entities/ProjectMember";

export class ProjectMemberRepositoryImpl implements IProjectMemberRepository {

  private mapToEntity(record: any): ProjectMember {
    return new ProjectMember(
      record.id,
      record.userId,
      record.projectId,
      record.role ?? undefined
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

  async findByProjectId(projectId: number): Promise<ProjectMember[]> {
    const records = await prisma.projectMember.findMany({
      where: { projectId },
    });

    return records.map(this.mapToEntity);
  }
}