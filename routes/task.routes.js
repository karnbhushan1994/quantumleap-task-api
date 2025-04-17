import express from 'express';
import { createTask, getTasks, getTaskStats } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.get('/stats', getTaskStats);

// ✅ Export as default
export default router;
