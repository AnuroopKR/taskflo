import { Router } from "express";
import { projectController } from "../controllers/project-controller";
import { authMiddleware } from "../middleware/auth.middleware";

const route=Router()

route.post("/",authMiddleware, projectController.createProject)
route.get ('/',authMiddleware,projectController.getByCompany)
route.get ('/:id',authMiddleware,projectController.getProjectById)

// route.post("/status",projectController.)


export default route 