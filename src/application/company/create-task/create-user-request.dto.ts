import { TaskStatus, TaskPriority } from "../../../domain/entities/task";

export interface CreateTaskRequest {
  title: string;
  description?: string;
  status?: TaskStatus;       // optional, default: PENDING
  priority?: TaskPriority;   // optional, default: MEDIUM
  startDate?: Date;
  dueDate?: Date;
  createdBy?: string;
  assignedTo?: string;
  projectId?: number;
}