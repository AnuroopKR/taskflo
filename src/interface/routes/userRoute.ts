
import { Router } from "express";
import { userController } from "../controllers/user-controller";
const route= Router();

route.post("/create-password", userController.createPassword);
route.get('/get-user/:id',userController.getUserById)
//  route.post("/create-project",userController.createProject)


export default route;