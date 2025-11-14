import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import * as TenantController from "../controllers/tenant.controller.js";
import projectRoutes from "./project.routes.js";

const router = Router({ mergeParams: true });

// All routes below require authentication
router.use(authenticateToken);

router.get("/", TenantController.index);
router.get("/:tenantId", TenantController.show);
router.post("/", TenantController.store);
router.post("/:tenantId/users", TenantController.addUserToTenant);

// nested routes
router.use("/:tenantId/projects", projectRoutes);

export default router;
