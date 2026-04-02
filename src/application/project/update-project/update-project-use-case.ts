// application/usecases/project/update-project.usecase.ts

import { IProjectRepository } from "../../../domain/repositories/project-repository.interface";

export class UpdateProjectUseCase {
  constructor(private projectRepo: IProjectRepository) {}

  async execute(input: { id: number; name: string }) {
    const project = await this.projectRepo.findById(input.id);

    if (!project) {
      throw new Error("Project not found");
    }

    project.updateName(input.name);

    return await this.projectRepo.update(project);
  }
}