import { Router } from "express";
import { taskController } from "../controllers/task-controller";

const route=Router()

route.post("/",taskController.createTask)
route.post("/status",taskController.updateStatus)
route.get("/:id",taskController.getTask)


export default route 