import { Request, Response } from "express";
import { companyRegisterUseCase } from "../../application/company/register/register-company.use-case";
import { loginUserUseCase, registerUseCase } from "../../config/container";
import { UserLoginUseCase } from "../../application/user/login/login-user-use-case";

export class AuthController {
  constructor(
    private registerUseCase: companyRegisterUseCase,
    private loginUseCase: UserLoginUseCase
  ) {}

  async register(req:Request, res:Response) {
    console.log(111,req.body)
    const result = await this.registerUseCase.execute(req.body);
    res.json(result);
  }

  async login(req:Request, res:Response) {
  try {
    const { user, accessToken, refreshToken } = await loginUserUseCase.execute(req.body);

    // Store tokens in HttpOnly cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user data (without password)
    res.status(200).json({ user });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
  }
 logout (req: Request, res: Response) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({ message: "Logged out successfully" });
}
}


const authController=new AuthController(registerUseCase,loginUserUseCase)

export {authController}
