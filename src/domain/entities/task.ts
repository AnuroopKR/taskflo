export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  COMPLETED = 'COMPLETED',
  REASSIGNED = 'REASSIGNED',
  OVERDUE = 'OVERDUE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string | null,
    public status: TaskStatus = TaskStatus.PENDING,
    public priority: TaskPriority = TaskPriority.MEDIUM,
    public startDate?: Date,
    public dueDate?: Date,
    public completedAt?: Date,
    public createdBy?: string,
    public assignedTo?: string,
    public projectId?: number
  ) {}
}