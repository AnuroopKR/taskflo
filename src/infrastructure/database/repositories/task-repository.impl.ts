import { Task, TaskStatus as DomainTaskStatus, TaskPriority as DomainTaskPriority } from "../../../domain/entities/task";
import { prisma } from "../../../config/prisma";
import { ITaskRepository } from "../../../domain/repositories/task-repository.interface";
import { TaskStatus as PrismaTaskStatus, TaskPriority as PrismaTaskPriority } from "../../../generated/prisma"


export class TaskRepositoryImpl implements ITaskRepository {

  private mapToEntity(record: {
    id: number;
    title: string;
    description: string | null;
    status: PrismaTaskStatus;
    priority: PrismaTaskPriority;
    startDate: Date | null;
    dueDate: Date | null;
    completedAt: Date | null;
    createdBy: string | null;
    assignedTo: string | null;
    projectId: number | null;
  }): Task {
    return new Task(
      record.id,
      record.title,
      record.description,
      record.status as DomainTaskStatus,
      record.priority as DomainTaskPriority,
      record.startDate ?? undefined,
      record.dueDate ?? undefined,
      record.completedAt ?? undefined,
      record.createdBy ?? undefined,
      record.assignedTo ?? undefined,
      record.projectId ?? undefined
    );
  }

  async save(task: Task): Promise<Task> {
    if (!task.id || task.id === 0) {
      // CREATE
      const created = await prisma.task.create({
        data: {
          title: task.title,
          description: task.description,
          status: task.status as PrismaTaskStatus,
          priority: task.priority as PrismaTaskPriority,
          startDate: task.startDate,
          dueDate: task.dueDate,
          completedAt: task.completedAt,
          createdBy: task.createdBy,
          assignedTo: task.assignedTo,
          projectId: task.projectId,
        },
      });

      return this.mapToEntity(created);
    }

    // UPDATE
    const updated = await prisma.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        status: task.status as PrismaTaskStatus,
        priority: task.priority as PrismaTaskPriority,
        startDate: task.startDate,
        dueDate: task.dueDate,
        completedAt: task.completedAt,
        createdBy: task.createdBy,
        assignedTo: task.assignedTo,
        projectId: task.projectId,
      },
    });

    return this.mapToEntity(updated);
  }

  async findById(id: number): Promise<Task | null> {
    const record = await prisma.task.findUnique({
      where: { id },
    });

    return record ? this.mapToEntity(record) : null;
  }

  async findAll(): Promise<Task[]> {
    const records = await prisma.task.findMany();
    return records.map((record) => this.mapToEntity(record));
  }
}