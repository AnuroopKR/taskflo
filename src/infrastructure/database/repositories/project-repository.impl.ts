// infrastructure/repositories/project.prisma.repository.ts

import { IProjectRepository } from "../../../domain/repositories/project-repository.interface";
import {
  Project,
  ProjectStatus,
  Priority,
} from "../../../domain/entities/Project";
import { prisma } from "../../../config/prisma";
import { Prisma } from "../../../generated/prisma";

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: { tasks: true; company: true };
}>;
export class ProjectRepositoryImpl implements IProjectRepository {
  async create(project: Project): Promise<Project> {
    const data = await prisma.project.create({
      data: {
        name: project.name,
        description: project.description,
        companyId: project.companyId,
        status: project.status,
        priority: project.priority,
        startDate: project.startDate ? new Date(project.startDate) : undefined,
        dueDate: project.dueDate ? new Date(project.dueDate) : undefined,
        ownerId: project.ownerId,
      },
    });

    return this.toDomain(data);
  }

  async findById(id: number): Promise<Project | null> {
    const data = await prisma.project.findUnique({
      where: { id },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

async findByCompany(companyId: string): Promise<ProjectWithRelations[]> {
  return prisma.project.findMany({
    where: { companyId },
    include: { tasks: true, company: true },
  });
}


  async update(project: Project): Promise<Project> {
    const data = await prisma.project.update({
      where: { id: project.id },
      data: {
        name: project.name,
        description: project.description,
        status: project.status,
        priority: project.priority,
        startDate: project.startDate,
        dueDate: project.dueDate,
        ownerId: project.ownerId,
      },
    });

    return this.toDomain(data);
  }

  async delete(id: number): Promise<void> {
    await prisma.project.delete({ where: { id } });
  }

  // ✅ Mapper (VERY IMPORTANT)
  private toDomain(data: any): Project {
    return new Project(
      data.id,
      data.name,
      data.companyId,
      data.description,
      data.status as ProjectStatus,
      data.priority as Priority,
      data.startDate,
      data.dueDate,
      data.ownerId,
    );
  }
}
