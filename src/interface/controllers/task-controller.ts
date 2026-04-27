import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../application/task/create-task/create-task-use-case";
import { createTaskUseCase, getTaskUseCase, updateStatusUseCase } from "../../config/container";
import { UpdateTaskStatusUseCase } from "../../application/task/change-status/update-status-use-case";
import { GetTaskUseCase } from "../../application/task/get-task/get-task-use-case";

class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private updateStatusUseCAse: UpdateTaskStatusUseCase,
    private getTaskUseCase:GetTaskUseCase
  ) {}

  createTask = async (req: Request, res: Response) => {
    try {
      const task = req.body;
      const userId=req.user?.id
      console.log(task)
      const taskData = await this.createTaskUseCase.execute({...task,createdBy:userId});
      res.status(200).json(taskData);
    } catch (error) {
      console.log(111, error);
      res.status(500).json({ message: "internal server error" });
    }
  };
  updateStatus = async (req: Request, res: Response) => {
    try {
      const { taskId, newStatus, comment } = req.body;
      const userId = req.user?.id;
      if (!userId) res.status(401).json({ message: "unautherized" });
      const result = await this.updateStatusUseCAse.execute(taskId, {
        status: newStatus,
        userId: userId!,
        comment: comment,
      });
      res.status(200).json({ data: result });
    } catch (error) {
      console.log(112, error);
      res.status(500).json({ message: "internal server error" });
    }
  };
  getTask=async (req: Request, res: Response)=>{
    try {
      const taskId=Number(req.params.id)
      const task=await this.getTaskUseCase.execute(taskId)
      return res.status(200).json(task)
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:"internal server error"})
    }
  }
}

export const taskController = new TaskController(
  createTaskUseCase,
  updateStatusUseCase,
  getTaskUseCase
);
