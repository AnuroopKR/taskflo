import { Request, Response } from "express";
import { companyRegisterUseCase } from "../../application/company/register/register-company.use-case";
import {
  loginUserUseCase,
  registerUseCase,
  verifyOtpUseCase,
} from "../../config/container";
import { UserLoginUseCase } from "../../application/user/login/login-user-use-case";
import { VerifyOtpUseCase } from "../../application/auth/verify-otp/verify-otp-use-case";

export class AuthController {
  constructor(
    private registerUseCase: companyRegisterUseCase,
    private loginUseCase: UserLoginUseCase,
    private verifyOtpUsecase: VerifyOtpUseCase,
  ) {}

  register = async (req: Request, res: Response) => {
    try {
      const result = await this.registerUseCase.execute(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  };

   login=async(req: Request, res: Response)=> {
    try {
      const { email,password } =req.body
      console.log(222,email,password)
      const { user, accessToken, refreshToken } = await this.loginUseCase.execute({email,password});

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
      console.log(333,err)
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
  logout(req: Request, res: Response) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });
  }

  verifyotp = async (req: Request, res: Response) => {
    try {
      const { email, code } = req.body;
      if (!email || !code) {
        return res.status(400).json({
          success: false,
          message: "Email and OTP code are required",
        });
      }
      const result = await this.verifyOtpUsecase.execute(email, code);

      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "Invalid OTP") {
          return res.status(400).json({
            success: false,
            message: "Invalid OTP",
          });
        }

        if (error.message === "OTP expired") {
          return res.status(400).json({
            success: false,
            message: "OTP expired",
          });
        }

        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
}

const authController = new AuthController(
  registerUseCase,
  loginUserUseCase,
  verifyOtpUseCase,
);

export { authController };
