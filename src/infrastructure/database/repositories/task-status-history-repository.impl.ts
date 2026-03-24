import { TaskStatusHistory } from "../../../domain/entities/Task-status";
import { prisma } from "../../../config/prisma";
import { ITaskStatusHistoryRepository } from "../../../domain/repositories/task-status-history-repository.interface";
import { TaskStatus as PrismaTaskStatus } from "../../../generated/prisma/enums";
import { TaskStatus } from "../../../domain/entities/task";

export class TaskStatusHistoryRepositoryImpl implements ITaskStatusHistoryRepository {

  // 🔁 Prisma → Domain
  private mapToEntity(record: {
    id: number;
    taskId: number;
    oldStatus: PrismaTaskStatus | null;
    newStatus: PrismaTaskStatus;
    changedBy: string | null;
    comment: string | null;
    createdAt: Date;
  }): TaskStatusHistory {
    return new TaskStatusHistory(
      record.id,
      record.taskId,
      record.oldStatus as TaskStatus | null,  // ✅ cast here only
      record.newStatus as TaskStatus,         // ✅ cast here only
      record.changedBy ?? null,
      record.comment ?? null,
      record.createdAt,
    );
  }

  // 🔁 Domain → Prisma
  async save(history: TaskStatusHistory): Promise<TaskStatusHistory> {
    const record = await prisma.taskStatusHistory.create({
      data: {
        taskId: history.taskId,
        oldStatus: history.oldStatus as PrismaTaskStatus | null, // ✅ cast
        newStatus: history.newStatus as PrismaTaskStatus,        // ✅ cast
        changedBy: history.changedBy,
        comment: history.comment,
      },
    });

    return this.mapToEntity(record);
  }

  async findByTaskId(taskId: number): Promise<TaskStatusHistory[]> {
    const records = await prisma.taskStatusHistory.findMany({
      where: { taskId },
      orderBy: { createdAt: "desc" }, // optional but useful
    });

    return records.map(record => this.mapToEntity(record));
  }

  async findById(id: number): Promise<TaskStatusHistory | null> {
    const record = await prisma.taskStatusHistory.findUnique({
      where: { id },
    });

    return record ? this.mapToEntity(record) : null;
  }
}