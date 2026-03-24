import { TaskStatusHistory } from '../../domain/entities/Task-status';

export interface ITaskStatusHistoryRepository {
  save(history: TaskStatusHistory): Promise<TaskStatusHistory>;
  findByTaskId(taskId: number): Promise<TaskStatusHistory[]>;
}