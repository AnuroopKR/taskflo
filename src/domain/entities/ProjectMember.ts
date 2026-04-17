// src/domain/entities/ProjectMember.ts

export class ProjectMember {
  constructor(
    public id: number,
    public userId: string,
    public projectId: number,
    public role?: string
  ) {
    this.validate();
  }

  private validate() {
    if (!this.userId) {
      throw new Error("User ID is required");
    }

    if (!this.projectId) {
      throw new Error("Project ID is required");
    }
  }

  changeRole(role: string) {
    this.role = role;
  }
}