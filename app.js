import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import taskRoutes from './routes/task.routes.js';

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

export default app;
