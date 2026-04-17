import { Request, Response } from "express";
import { CreateProjectUseCase } from "../../application/project/create-project/create-project-use-case";
import {
  addMembersUseCase,
  createProjectUseCase,
  getProjectByIdUseCase,
  getProjectUseCase,
} from "../../config/container";
import { GetProjectsUseCase } from "../../application/project/get-project/get-project-use-case";
import { GetProjectByIdUseCase } from "../../application/project/get-project-by-id/get-project-by-id-use-case";
import { AddProjectMembersUseCase } from "../../application/project/add-member/add-member-use-case";

export class ProjectController {
  constructor(
    private createProjectUseCase: CreateProjectUseCase,
    private getProjectUseCase: GetProjectsUseCase,
    private getProjectByIdUseCase: GetProjectByIdUseCase,
    private addMembersUseCase: AddProjectMembersUseCase,
  ) {}

  createProject = async (req: Request, res: Response) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { name, description, priority, startDate, dueDate } = req.body;

      const project = await this.createProjectUseCase.execute(
        {
          name,
          description,
          status: "ACTIVE",
          priority,
          startDate,
          dueDate,
        },
        user.id,
        user.companyId,
      );

      return res.status(201).json({
        message: "Project created successfully",
        data: project,
      });
    } catch (error: any) {
      console.log("createProject error", error);
      return res.status(400).json({
        message: error.message || "Something went wrong",
      });
    }
  };

  getByCompany = async (req: Request, res: Response) => {
    try {
      const companyId = req.user?.companyId;
      if (!companyId) return res.status(400).json("unautherized");

      const projects = await this.getProjectUseCase.execute(companyId);

      res.json(projects);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getProjectById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const companyId = req.user?.companyId;
      if (!companyId) return res.status(400).json("unautherized");

      if (!id) return res.status(404).json("route not found");

      const project = await this.getProjectByIdUseCase.execute(id);
      res.json(project);
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };

  addMembers = async (req: Request, res: Response) => {
    try {
      const projectId = Number(req.params.id);
      const userIds = req.body.userIds;
      await this.addMembersUseCase.execute(projectId, userIds);
      return res.json({ message: "Members added successfully" });
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({
        message: error.message,
      });
    }
  };
}

export const projectController = new ProjectController(
  createProjectUseCase,
  getProjectUseCase,
  getProjectByIdUseCase,
  addMembersUseCase,
);
