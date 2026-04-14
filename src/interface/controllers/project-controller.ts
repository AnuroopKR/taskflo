import { Request, Response } from "express";
import { CreateProjectUseCase } from "../../application/project/create-project/create-project-use-case";
import { createProjectUseCase } from "../../config/container";

export class ProjectController {

    constructor(
        private createProjectUseCase:CreateProjectUseCase
    ){

    }
  

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
        status:"ACTIVE",
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
    console.log("createProject error",error)
    return res.status(400).json({
      message: error.message || "Something went wrong",
    });
  }
};

//   static async getByCompany(req: Request, res: Response) {
//     try {
//       const useCase = new GetProjectsUseCase(repo);

//       const projects = await useCase.execute(req.params.companyId);

//       res.json(projects);
//     } catch (error: any) {
//       res.status(400).json({ message: error.message });
//     }
//   }
}

export const projectController=new ProjectController(createProjectUseCase)