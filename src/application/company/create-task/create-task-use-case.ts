import { Task, TaskPriority, TaskStatus } from "../../../domain/entities/task";
import { ITaskRepository } from "../../../domain/repositories/task-repository.interface";
import { CreateTaskRequest } from "./create-user-request.dto";


export class CreateTaskUseCase{
    constructor(
        private taskRepo:ITaskRepository
    ){}

    async execute(data:CreateTaskRequest):Promise<void>{
        
    const task = new Task(
  0,
  data.title,
  data.description ?? null,
  data.status ?? TaskStatus.PENDING,
  data.priority ?? TaskPriority.MEDIUM, // ✅ FIX
  data.startDate,
  data.dueDate,
  undefined,
  data.createdBy,
  data.assignedTo,
  data.projectId
);
        const result=await this.taskRepo.save(task)
    }
}