// src/domain/repositories/task-submission.repository.ts

import { TaskSubmission } from "../entities/Submission";


export interface ITaskSubmissionRepository {
  create(submission: TaskSubmission): Promise<TaskSubmission>;
  findByUser(userId: string): Promise<TaskSubmission[]>;
  findByProject(projectId: number): Promise<TaskSubmission[]>;
  review(submission: TaskSubmission): Promise<TaskSubmission>;
}