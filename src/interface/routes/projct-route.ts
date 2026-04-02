import { Router } from "express";
import { projectController } from "../controllers/project-controller";

const route=Router()

route.post("/",projectController.createProject)
// route.post("/status",projectController.)


export default route 