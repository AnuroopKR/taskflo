import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/company/create-user/create-user-use-case";
import { createUserUSEcase, getUserUseCase } from "../../config/container";
import { GetUserUseCase } from "../../application/company/get-user/get-user-usecase";

class CompanyController {
  constructor(private createUserUseCase: CreateUserUseCase,
    private getUserUseCase:GetUserUseCase
  ) {}

  createUser = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const companyId='b823c735-f42c-4bb1-ac4d-6896b64b5335'

      const user = await this.createUserUseCase.execute({...userData,companyId});

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

  getUser=async(req: Request, res: Response)=>{
    try {
      const userId=req.user?.id
      if(!userId) res.status(401).json({message:"user unautherized"})
      else{
    const userData=await this.getUserUseCase.execute(userId)
  res.status(200).json(userData)}
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"internal server error"})
    }
  }
}

const companyController = new CompanyController(createUserUSEcase,getUserUseCase);

export { companyController };
