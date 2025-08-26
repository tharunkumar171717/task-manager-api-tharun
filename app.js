const express = require('express');
const sequelize = require('./config/db');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const index=require('./config/index');
const rateLimit=require('./middleware/rateLimit');
// Initialize Express
const app = express();
app.use(morgan('dev'));
app.use(express.json());
// Routes
app.use('/auth', rateLimit, authRoutes);
app.use('/tasks', rateLimit, taskRoutes);
// Global error handler
app.use(errorMiddleware);
// Start server with DB sync
const startServer = async () => {
  try {
    await sequelize.sync();
    console.log(' Database synced');
    const PORT = index.PORT || 4000;
    app.listen(PORT, () =>
      console.log(` Server running on port ${PORT}`),
    );
  } catch (err) {
    console.error(' DB connection failed:', err);
  }
};
startServer();
