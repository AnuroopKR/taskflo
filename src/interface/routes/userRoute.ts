
import { Router } from "express";
import { userController } from "../controllers/user-controller";
const route= Router();

route.post("/create-password", userController.createPassword);
// route.post("/login",authController.login)


export default route;