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
    // 🚫 No tokens
    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // ✅ Try access token first
    if (accessToken) {
      const decoded: JwtPayload | null =
        jwtService.verifyAccessToken(accessToken);

      if (decoded) {
        (req as any).user = decoded;
        return next();
      }
      // ❗ If access token invalid → fallback to refresh
    }

    // 🔄 Use refresh token
    if (refreshToken) {
      const decoded: JwtPayload | null =
        jwtService.verifyRefreshToken(refreshToken);

      if (!decoded) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      // 🔁 Generate new tokens (rotation)
      const newAccessToken = jwtService.generateAccessToken({
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        companyId: decoded.companyId,
      });
      const newRefreshToken = jwtService.generateRefreshToken({
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        companyId: decoded.companyId,
      });

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      (req as any).user = decoded;
      return next();
    }

    return res.status(401).json({ message: "Authentication failed" });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};
