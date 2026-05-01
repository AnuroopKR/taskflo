import { Router } from "express";
import { taskController } from "../controllers/task-controller";
import { authMiddleware } from "../middleware/auth.middleware";

const route=Router()

route.post("/",taskController.createTask)
route.post("/status",taskController.updateStatus)
route.get("/:id",taskController.getTask)
route.post("/submit",authMiddleware, taskController.submitTask)



export default route 