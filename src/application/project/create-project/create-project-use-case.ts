// application/usecases/project/create-project.usecase.ts

import { Project } from "../../../domain/entities/Project";
import { IProjectRepository } from "../../../domain/repositories/project-repository.interface";
import { CreateProjectRequestDto } from "./create-project-request.dto";

export class CreateProjectUseCase {
  constructor(private projectRepo: IProjectRepository) {}

  async execute(input: CreateProjectRequestDto,user:string) {
    const project = new Project(
      0, // temp (DB will generate)
      input.name,
      user
    );

    return await this.projectRepo.create(project);
  }
}