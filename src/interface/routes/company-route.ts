
import { Router } from "express";
import { companyController } from "../controllers/company-controller";
import { userController } from "../controllers/user-controller";
const route= Router();

route.post("/create-user", companyController.createUser);
route.get("/",companyController.getUser)
// route.post("/login",authController.login)


export default route;