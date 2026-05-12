export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
  COMPLETED = "COMPLETED",
  REASSIGNED = "REASSIGNED",
  OVERDUE = "OVERDUE",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
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
    public createdBy?: string | null,
    public assignedTo?: string | null,
    public projectId?: number | null,
  ) {}

  validate() {
    // Title validation
    if (!this.title || this.title.trim().length < 3) {
      throw new Error("Task title must be at least 3 characters");
    }

    // Description validation
    if (this.description && this.description.length > 1000) {
      throw new Error("Description too long");
    }

    // AssignedTo validation
    if (this.assignedTo && this.assignedTo.trim() === "") {
      this.assignedTo = null;
    }

    // Date validation
    if (this.startDate && this.dueDate && this.startDate > this.dueDate) {
      throw new Error("Due date must be after start date");
    }

    // Completed validation
    if (this.status === TaskStatus.COMPLETED && !this.completedAt) {
      this.completedAt = new Date();
    }
  }
}
