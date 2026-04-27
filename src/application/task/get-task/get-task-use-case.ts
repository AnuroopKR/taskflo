
import { IProjectRepository } from "../../../domain/repositories/project-repository.interface";
import { ITaskRepository } from "../../../domain/repositories/task-repository.interface";
import { IUserRepository } from "../../../domain/repositories/user-repository.interface";

export class GetTaskUseCase {
  constructor(private taskRepo: ITaskRepository,
    private userRepo:IUserRepository,
    private projectRepo:IProjectRepository
  ) {}

  async execute(id: number) {
    const task= await this.taskRepo.findById(id);
    const user=await this.userRepo.findById(task?.assignedTo!)
    const project=await this.projectRepo.findById(Number(task?.projectId!))
    console.log(234,task,123,user,123,project)
    return {task,user,project}
  }
}