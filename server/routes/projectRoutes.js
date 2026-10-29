import express from "express";
import {addProject,generateEvaluation,getAllProjects,getProjectById} from "../controllers/ProjectController.js";

const projectRouter = express.Router();

projectRouter.post("/add", addProject);
projectRouter.post("/evaluate/:id", generateEvaluation);
projectRouter.get("/all", getAllProjects);
projectRouter.get("/:id", getProjectById);

export default projectRouter;