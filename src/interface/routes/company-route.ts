
import { Router } from "express";
import { companyController } from "../controllers/company-controller";
import { authMiddleware } from "../middleware/auth.middleware";
const route= Router();

route.post("/create-user",authMiddleware, companyController.createUser);
route.get("/",authMiddleware,companyController.getUser)
// route.post("/login",authController.login)


export default route;