// application/usecases/project/create-project.usecase.ts

import { Project } from "../../../domain/entities/Project";
import { IProjectRepository } from "../../../domain/repositories/project-repository.interface";

export class CreateProjectUseCase {
  constructor(private projectRepo: IProjectRepository) {}

  async execute(input: {
    name: string;
    companyId: string;
  }) {
    const project = new Project(
      0, // temp (DB will generate)
      input.name,
      input.companyId
    );

    return await this.projectRepo.create(project);
  }
}