// domain/entities/TaskStatusHistory.ts
import { TaskStatus } from './task';
import { User } from './User';

export class TaskStatusHistory {
  constructor(
    public readonly id: number|null,
    public readonly taskId: number,
    public readonly oldStatus: TaskStatus | null,
    public readonly newStatus: TaskStatus,
    public readonly changedBy: string | null,
    public readonly comment: string | null,
    public readonly createdAt: Date|null,
  ) {}

   // ✅ Factory for creation (no id / createdAt)
  static create(params: {
    taskId: number;
    oldStatus: TaskStatus | null;
    newStatus: TaskStatus;
    changedBy?: string | null;
    comment?: string | null;
  }): TaskStatusHistory {
    return new TaskStatusHistory(
      null,
      params.taskId,
      params.oldStatus,
      params.newStatus,
      params.changedBy ?? null,
      params.comment ?? null,
      null
    );
  }
}