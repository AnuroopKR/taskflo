import { Router } from "express";
import { projectController } from "../controllers/project-controller";
import { authMiddleware } from "../middleware/auth.middleware";

const route=Router()

route.post("/",authMiddleware, projectController.createProject)
// route.post("/status",projectController.)


export default route 