// domain/repositories/project.repository.ts

import { ProjectWithRelations } from "../../infrastructure/database/repositories/project-repository.impl";
import { Project } from "../entities/Project";

export interface IProjectRepository {
  create(project: Project): Promise<Project>;
  findById(id: number): Promise<Project | null>;
  findByCompany(companyId: string): Promise<ProjectWithRelations[]>;
  update(project: Project): Promise<Project>;
  delete(id: number): Promise<void>;
}