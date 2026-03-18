import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../application/company/create-task/create-task-use-case";
import { createTaskUseCase } from "../../config/container";

class TaskController{
    constructor(
        private createTaskUseCase:CreateTaskUseCase
    ){}

    createTask=async(req:Request,res:Response)=>{
        try {
            const task=req.body
            const taskData=await this.createTaskUseCase.execute(task)
            res.status(200).json(taskData)
        } catch (error) {
            res.status(500).json({message:"internal server error"})
            console.log(111,error)
        }
    }
}

export const taskController=new TaskController(createTaskUseCase)