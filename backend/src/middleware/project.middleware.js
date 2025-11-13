import { pool } from "../config/db.js";
import { AppError } from "../middleware/error.middleware.js";

export const authorizeProjectAccess = async (req, res, next) => {
  const { tenantId, projectId } = req.params;

  try {
    if (!tenantId || !projectId) {
      return next(new AppError(400, "Tenant ID and Project ID are required"));
    }

    if (isNaN(tenantId) || isNaN(projectId)) {
      return next(
        new AppError(400, "Tenant ID and Project ID must be valid numbers")
      );
    }

    // Check if the project exists under the specified tenant
    const [projectRows] = await pool.execute(
      `SELECT id FROM projects WHERE id = ? AND tenant_id = ? LIMIT 1`,
      [projectId, tenantId]
    );

    if (projectRows.length === 0) {
      return next(
        new AppError(404, "Project not found under the specified tenant")
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
