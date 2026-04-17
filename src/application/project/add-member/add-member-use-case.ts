// src/application/project/add-members/add-members.usecase.ts

import { IProjectMemberRepository } from "../../../domain/repositories/project-member-repository.interface";

export class AddProjectMembersUseCase {
  constructor(private projectRepo: IProjectMemberRepository) {}

  async execute(projectId: number, userIds: string[]) {
    console.log(4,userIds)
    if (!userIds.length) {
      throw new Error("No users selected");
    }

    await this.projectRepo.addMembers(projectId, userIds);
  }
}