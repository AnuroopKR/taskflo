// src/infrastructure/repositories/task-submission.repository.impl.ts

import { prisma } from "../../../config/prisma";
import { TaskSubmission } from "../../../domain/entities/Submission";
import { ITaskSubmissionRepository } from "../../../domain/repositories/task-submission-repository.interface";


export class TaskSubmissionMapper {
  static toDomain(data: any): TaskSubmission {
    return new TaskSubmission(
      data.id,
      data.taskId,
      data.submittedBy,
      data.comment,
      data.files ?? [],
      data.link ?? "",
      data.reviewedBy ?? undefined,
      data.reviewStatus ?? "PENDING",
      data.reviewComment ?? undefined,
      data.submittedAt,
      data.reviewedAt
    );
  }

  static toPrisma(entity: TaskSubmission) {
    return {
      taskId: entity.taskId,
      submittedBy: entity.submittedBy,
      comment: entity.comment,
      files: entity.files,
      link: entity.link,
      reviewedBy: entity.reviewedBy,
      reviewStatus: entity.reviewStatus,
      reviewComment: entity.reviewComment,
      reviewedAt: entity.reviewedAt,
    };
  }
}

export class TaskSubmissionRepositoryImpl implements ITaskSubmissionRepository {

  async create(submission: TaskSubmission): Promise<TaskSubmission> {
    const data = await prisma.taskSubmission.create({
      data: TaskSubmissionMapper.toPrisma(submission),
    });

    return TaskSubmissionMapper.toDomain(data);
  }

  async findByUser(userId: string): Promise<TaskSubmission[]> {
    const results = await prisma.taskSubmission.findMany({
      where: {
        submittedBy: userId,
      },
      orderBy: {
        submittedAt: "desc",
      },
    });

    return results.map(TaskSubmissionMapper.toDomain);
  }

  async findByProject(projectId: number): Promise<TaskSubmission[]> {
    const results = await prisma.taskSubmission.findMany({
      where: {
        task: {
          projectId: projectId,
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    });

    return results.map(TaskSubmissionMapper.toDomain);
  }

  async review(submission: TaskSubmission): Promise<TaskSubmission> {
    const updated = await prisma.taskSubmission.update({
      where: { id: submission.id },
      data: {
        reviewedBy: submission.reviewedBy,
        reviewStatus: submission.reviewStatus,
        reviewComment: submission.reviewComment,
        reviewedAt: submission.reviewedAt,
      },
    });

    return TaskSubmissionMapper.toDomain(updated);
  }
}