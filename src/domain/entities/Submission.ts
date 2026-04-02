// src/domain/entities/task-submission.entity.ts

export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export class TaskSubmission {
  public readonly submittedAt: Date;
  public reviewedAt?: Date;

  constructor(
    public id: number,
    public taskId: number,
    public submittedBy: string,
    public comment?: string,

    public reviewedBy?: string,
    public reviewStatus?: SubmissionStatus,
    public reviewComment?: string
  ) {
    this.submittedAt = new Date();
    this.validate();
  }

  private validate() {
    this.comment = this.comment?.trim();
    if (!this.taskId) {
      throw new Error("Task ID is required");
    }

    if (!this.submittedBy) {
      throw new Error("SubmittedBy (user id) is required");
    }

    if (this.comment && this.comment.length > 500) {
      throw new Error("Comment cannot exceed 500 characters");
    }
    if (this.reviewStatus === "APPROVED" && !this.comment) {
  throw new Error("Approval should include a comment");
}
  }

  public reviewSubmission(
    reviewerId: string,
    status: SubmissionStatus,
    comment?: string
  ) {
    this.reviewedBy = reviewerId;
    this.reviewStatus = status;
    this.reviewComment = comment;
    this.reviewedAt = new Date();
  }
}