
import { Router } from "express";
import { userController } from "../controllers/user-controller";
const route= Router();

route.post("/create-password", userController.createPassword);
route.get('/get-user/:id',userController.getUserById)
// route.post("/login",authController.login)


export default route;