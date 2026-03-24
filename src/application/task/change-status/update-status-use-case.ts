import { TaskStatusHistory } from "../../../domain/entities/Task-status";
import { ITaskRepository } from "../../../domain/repositories/task-repository.interface";
import { ITaskStatusHistoryRepository } from "../../../domain/repositories/task-status-history-repository.interface";
import { StatusHistoryDto } from "./change-status-request.dto";

export class UpdateTaskStatusUseCase {
  constructor(
    private taskRepo: ITaskRepository,
    private statusRepo: ITaskStatusHistoryRepository,
  ) {}

  async execute(taskId: number, status: StatusHistoryDto) {
    const task = await this.taskRepo.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    // Create DOMAIN ENTITY (not plain object)
    const history = TaskStatusHistory.create({
      taskId: taskId,
      oldStatus: task.status,
      newStatus: status.status,
      changedBy: status.userId,
      comment: status.comment,
    });
    
    //  Update task
    task.status = status.status;

    await this.statusRepo.save(history);
    return await this.taskRepo.save(task);
  }
}
