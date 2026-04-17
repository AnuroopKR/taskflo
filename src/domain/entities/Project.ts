// src/domain/entities/project.entity.ts

export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ON_HOLD" | "CANCELLED";

export type Priority = "LOW" | "MEDIUM" | "HIGH";

export class Project {
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    public id: number,
    public name: string,
    public companyId: string,
    public description?: string,
    public status: ProjectStatus = "ACTIVE",
    public priority: Priority = "MEDIUM",
    public startDate?: Date,
    public dueDate?: Date,
    public ownerId?: string,
    public tasks: any[] = [] ,// or Task[]
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.name = name.trim();
  this.createdAt = createdAt ?? new Date();
  this.updatedAt = updatedAt ?? new Date();

    this.validate();
  }

  private validate() {
    if (!this.name || this.name.length < 3) {
      throw new Error("Project name must be at least 3 characters long");
    }

    if (!this.companyId) {
      throw new Error("Company ID is required");
    }

    if (this.dueDate && this.startDate && this.dueDate < this.startDate) {
      throw new Error("Due date cannot be earlier than start date");
    }
  }

  // Business Methods

  public updateName(newName: string) {
    if (!newName || newName.trim().length < 3) {
      throw new Error("Project name must be at least 3 characters long");
    }

    this.name = newName.trim();
    this.touch();
  }

  public updateDescription(description?: string) {
    this.description = description?.trim();
    this.touch();
  }

  public changeStatus(status: ProjectStatus) {
    this.status = status;
    this.touch();
  }

  public changePriority(priority: Priority) {
    this.priority = priority;
    this.touch();
  }

  public setDates(startDate?: Date, dueDate?: Date) {
    if (dueDate && startDate && dueDate < startDate) {
      throw new Error("Due date cannot be earlier than start date");
    }

    this.startDate = startDate;
    this.dueDate = dueDate;
    this.touch();
  }

  public assignOwner(ownerId: string) {
    if (!ownerId) {
      throw new Error("Owner ID is required");
    }

    this.ownerId = ownerId;
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }
}
