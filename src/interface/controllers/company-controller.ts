import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/company/create-user/create-user-use-case";
import { createUserUSEcase } from "../../config/container";

class CompanyController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  createUser = async (req: Request, res: Response) => {
    try {
      const userData = req.body;

      const user = await this.createUserUseCase.execute(userData);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error: any) {
      console.error("Create user error:", error);

      return res.status(error?.statusCode || 500).json({
        success: false,
        message: error?.message || "Internal server error",
      });
    }
  };
}

const companyController = new CompanyController(createUserUSEcase);

export { companyController };
