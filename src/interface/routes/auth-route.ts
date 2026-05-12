
import { Router } from "express";
import { authController } from "../controllers/auth-controller";
import { authMiddleware } from "../middleware/auth.middleware";
const route= Router();

route.post("/", authController.register);
route.post("/login",authController.login)
route.post("/set-password",authController.setPassword)
route.get("/verify-token",authMiddleware,authController.verifyToken)
route.post('/verify-otp',authController.verifyotp)


export default route;