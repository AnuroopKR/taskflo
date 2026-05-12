
import { IProjectRepository } from "../../../domain/repositories/project-repository.interface";
import { ITaskRepository } from "../../../domain/repositories/task-repository.interface";
import { IUserRepository } from "../../../domain/repositories/user-repository.interface";

export class GetTaskUseCase {
  constructor(private taskRepo: ITaskRepository,
    private userRepo:IUserRepository,
    private projectRepo:IProjectRepository
  ) {}

  async execute(id: number,userId:string) {
    const task= await this.taskRepo.findById(id);
    const createdBy=await this.userRepo.findById(userId)
    let user
    if(task?.assignedTo){
    user=await this.userRepo.findById(task?.assignedTo)}
    const project=await this.projectRepo.findById(Number(task?.projectId!))
    return {task,user,project,createdBy}
  }
}