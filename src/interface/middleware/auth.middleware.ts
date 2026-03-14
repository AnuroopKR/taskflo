import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../infrastructure/security/jwt";
import { JwtPayload } from "../../domain/repositories/jwt-token-repository.interface";

const jwtService = new JwtService(
  process.env.JWT_ACCESS_SECRET || "default_access_secret",
  process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
);

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (!accessToken && refreshToken) {
      const user = jwtService.verifyRefreshToken(refreshToken);
      if (!user) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      const newAccessToken = jwtService.generateAccessToken(user);
      res.cookie("accessToken", newAccessToken, { httpOnly: true });
      (req as any).user = user;
      return next();
    }

    const decoded: JwtPayload | null = jwtService.verifyAccessToken(accessToken);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};