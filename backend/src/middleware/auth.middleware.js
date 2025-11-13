import jwt from "jsonwebtoken";
import { AppError } from "../middleware/error.middleware.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    // Check if the authorization header is present and properly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(401, "Unauthorized: No token provided");
    }
    // Verify the JWT
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    // Handle JWT errors specifically
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return next(new AppError(401, "Unauthorized: Invalid or expired token"));
    }
    next(error);
  }
};
