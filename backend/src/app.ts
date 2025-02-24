import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import { authenticateToken } from "./middleware/auth";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize database
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

app.use("/auth", authRoutes);
app.use("/api/tasks", authenticateToken, taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
