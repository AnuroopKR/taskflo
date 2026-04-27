
import { IProjectRepository } from "../../../domain/repositories/project-repository.interface";
import { ITaskRepository } from "../../../domain/repositories/task-repository.interface";

export class GetProjectByIdUseCase {
  constructor(private projectRepo: IProjectRepository,
    private taskRepo:ITaskRepository
  ) {}

  async execute(id: number) {
    const project= await this.projectRepo.findById(id);
    const tasks=await this.taskRepo.findByProject(Number(project?.id!))

    return {project,tasks}

  }
}