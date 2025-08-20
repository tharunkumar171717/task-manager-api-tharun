
const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
dotenv.config();
const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use(errorMiddleware);
sequelize.sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch(err => console.error("DB connection failed:", err));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));