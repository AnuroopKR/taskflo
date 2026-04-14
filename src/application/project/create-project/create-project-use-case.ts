// application/usecases/project/create-project.usecase.ts

import { Project } from "../../../domain/entities/Project";
import { IProjectRepository } from "../../../domain/repositories/project-repository.interface";
import { CreateProjectRequestDto } from "./create-project-request.dto";

export class CreateProjectUseCase {
  constructor(private projectRepo: IProjectRepository) {}

  async execute(input: CreateProjectRequestDto, userId: string, companyId: string) {
  const project = new Project(
    0,
    input.name,
    companyId,           // ✅ correct
    input.description,
    input.status,
    input.priority,
    input.startDate,
    input.dueDate,
    userId               // ✅ ownerId
  );

  return await this.projectRepo.create(project);
}
}