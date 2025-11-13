import express from "express";
import cors from "cors";
import "dotenv/config";
import { AppError, errorHandler } from "./middleware/error.middleware";
import { testConnection } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Handle undefined routes
app.use((req, res, next) => {
  next(new AppError(404, "Resource not found"));
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, async () => {
  await testConnection();
  console.log(`Server is running on port ${PORT}`);
});
