import { Request, Response } from "express";
import { createUserPassword } from "../../config/container";
import { CreateUserPasswordUseCase } from "../../application/user/create-user-password/create-user-password-use-case";

class UserController {
  constructor(private createUserPassword: CreateUserPasswordUseCase) {}

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
}

const userController = new UserController(createUserPassword);

export { userController };
