// src/domain/repositories/project-member-repository.interface.ts

import { ProjectMemberDTO } from "../../application/project/get-members/project-member-response.dto";
import { ProjectMember } from "../entities/ProjectMember";

export interface IProjectMemberRepository {
  addMembers(projectId: number, userIds: string[]): Promise<void>;
  removeMember(projectId: number, userId: string): Promise<void>;
  findByProjectId(projectId: number): Promise<ProjectMemberDTO[]>;
}