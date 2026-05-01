import { TaskSubmission } from "../../../domain/entities/Submission";
import { ITaskSubmissionRepository } from "../../../domain/repositories/task-submission-repository.interface";

export class SubmitTaskUseCase{
    constructor(
        private taskSubmitRepo:ITaskSubmissionRepository
    ){}

    async execute(data:{
    taskId: number;
    submittedBy: string;
    comment?: string;
    files?: string[];
    link?: string;
  }){
        const submission = new TaskSubmission(
      0,
      data.taskId,
      data.submittedBy,
      data.comment,
      data.files,
      data.link
    );

     return this.taskSubmitRepo.create(submission);
    }
}