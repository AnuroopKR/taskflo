
import { Router } from "express";
import { companyController } from "../controllers/company-controller";
const route= Router();

route.post("/create-user", companyController.createUser);
// route.post("/login",authController.login)


export default route;