import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizeTenantAccess } from "../middleware/tenant.middleware.js";
import { authorizeProjectAccess } from "../middleware/project.middleware.js";
import * as TaskController from "../controllers/task.controller.js";

const router = Router({ mergeParams: true });

// All routes below require authentication
/* router.use(authenticateToken);
router.use(authorizeTenantAccess);
router.use(authorizeProjectAccess); */

router.get("/", TaskController.index);
router.get("/:taskId", TaskController.show);
router.post("/", TaskController.store);
router.put("/:taskId", TaskController.update);
router.delete("/:taskId", TaskController.destroy);

export default router;
