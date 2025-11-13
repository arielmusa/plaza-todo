import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizeTenantAccess } from "../middleware/authorizeTenantAccess.middleware.js";
import * as ProjectController from "../controllers/project.controller.js";

const router = Router({ mergeParams: true });

// All routes below require authentication
router.use(authenticateToken);

router.get("/", authorizeTenantAccess, ProjectController.indexProject);
router.get("/:projectId", authorizeTenantAccess, ProjectController.showProject);
router.post("/", authorizeTenantAccess, ProjectController.storeProject);

export default router;
