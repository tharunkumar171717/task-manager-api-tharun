const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const morgan = require("morgan");
// Load routes & middleware
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(morgan("dev"));
app.use(express.json());
// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
// Global error handler
app.use(errorMiddleware);
// Start server with DB sync
const startServer = async () => {
  try {
    // Drops & recreates all tables 
    await sequelize.sync({ alter: true }); 
    console.log(" Database synced");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(` Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error(" DB connection failed:", err);
  }
};
startServer();