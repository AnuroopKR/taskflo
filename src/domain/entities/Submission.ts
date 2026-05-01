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
    public files: string[] = [],
    public link?: string,

    public reviewedBy?: string,
    public reviewStatus: SubmissionStatus = "PENDING",
    public reviewComment?: string,

    submittedAt?: Date,
    reviewedAt?: Date
  ) {
    this.submittedAt = submittedAt ?? new Date();
    this.reviewedAt = reviewedAt;

    this.validate();
  }

  // ✅ Validation
  private validate() {
    this.comment = this.comment?.trim();
    this.link = this.link?.trim();

    if (!this.taskId) {
      throw new Error("Task ID is required");
    }

    if (!this.submittedBy) {
      throw new Error("SubmittedBy (user id) is required");
    }

    if (this.comment && this.comment.length > 500) {
      throw new Error("Comment cannot exceed 500 characters");
    }

    if (this.files && !Array.isArray(this.files)) {
      throw new Error("Files must be an array");
    }

    if (this.link && !this.link.startsWith("http")) {
      throw new Error("Link must be a valid URL");
    }

    // ⚠️ Fix: check reviewComment instead of comment
    if (this.reviewStatus === "APPROVED" && !this.reviewComment) {
      throw new Error("Approval must include a review comment");
    }
  }

  // ✅ Domain Method: Review
  public reviewSubmission(
    reviewerId: string,
    status: SubmissionStatus,
    comment?: string
  ) {
    if (!reviewerId) {
      throw new Error("Reviewer ID is required");
    }

    this.reviewedBy = reviewerId;
    this.reviewStatus = status;
    this.reviewComment = comment?.trim();
    this.reviewedAt = new Date();

    this.validate();
  }

  // ✅ Domain Method: Update submission (optional but useful)
  public updateSubmission(comment?: string, files?: string[], link?: string) {
    if (comment !== undefined) this.comment = comment.trim();
    if (files !== undefined) this.files = files;
    if (link !== undefined) this.link = link.trim();

    this.validate();
  }
}