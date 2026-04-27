import { IProjectMemberRepository } from "../../../domain/repositories/project-member-repository.interface";
import { ProjectMemberDTO } from "./project-member-response.dto";


export class GetProjectMembersUseCase {
  constructor(
    private projectMemberRepo: IProjectMemberRepository
  ) {}

  async execute(projectId: number): Promise<ProjectMemberDTO[]> {
    console.log(555,projectId)
    // 1️⃣ Get members (already includes user from repo)
    const members = await this.projectMemberRepo.findByProjectId(projectId);

    if (!members.length) return [];

    // 2️⃣ Map Entity → DTO
    return members.map((member) => {
      if (!member.user) {
        throw new Error(`User data missing for member ${member.id}`);
      }

      return {
        id: member.id,
        user: {
          id: member.user.id,
          name: member.user.name,
          email: member.user.email,
        },
      };
    });
  }
}