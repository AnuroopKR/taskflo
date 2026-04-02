// application/usecases/project/get-projects.usecase.ts

import { IProjectRepository } from "../../../domain/repositories/project-repository.interface";

export class GetProjectsUseCase {
  constructor(private projectRepo: IProjectRepository) {}

  async execute(companyId: string) {
    return await this.projectRepo.findByCompany(companyId);
  }
}