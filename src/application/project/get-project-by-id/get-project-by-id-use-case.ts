
import { IProjectRepository } from "../../../domain/repositories/project-repository.interface";

export class GetProjectByIdUseCase {
  constructor(private projectRepo: IProjectRepository) {}

  async execute(id: number) {
    return await this.projectRepo.findById(id);
  }
}