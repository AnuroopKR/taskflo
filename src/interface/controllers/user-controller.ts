import { Request, Response } from "express";
import { createUserPassword, getUserByIdUseCase } from "../../config/container";
import { CreateUserPasswordUseCase } from "../../application/user/create-user-password/create-user-password-use-case";
import { GetUserByIdUseCase } from "../../application/user/get-user-by-id/get-user-byid-use-case";
import { NotFoundError } from "../../application/errors/notfound.error";

class UserController {
  constructor(private createUserPassword: CreateUserPasswordUseCase,
    private getUserByIdUseCase:GetUserByIdUseCase
  ) {}

  createPassword = async (req: Request, res: Response) => {
    try {
      const userData = req.body;

      const user = await this.createUserPassword.execute(userData);

      return res.status(201).json({
        success: true,
        message: "password created",
        data: user,
      });
    } catch (error: any) {
      console.error("Create password error:", error);

      return res.status(error?.statusCode || 500).json({
        success: false,
        message: error?.message || "Internal server error",
      });
    }
  };
  getUserById=async (req: Request, res: Response)=>{
    try {
      const id=req.params.id as string
      const userData=await this.getUserByIdUseCase.execute(id)
      res.status(200).json(userData)
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"internal server error"})
    }
  }
}


const userController = new UserController(createUserPassword,getUserByIdUseCase);

export { userController };
