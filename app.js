const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const morgan=require("morgan")
// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(morgan("dev"))

// Global error handler
app.use(errorMiddleware);

// Start server with DB sync
const startServer = async () => {
  try {
    // sync models with DB
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
