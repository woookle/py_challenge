import express from 'express';
import { createTask, deleteTask, getTask, getTasks, runCode } from '../controllers/taskController.js';
import checkAuth from '../middleware/checkAuth.js';
import checkAdminRole from '../middleware/checkAdminRole.js';

const router = express.Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);

router.post('/create', checkAuth, checkAdminRole, createTask)
router.post('/run_code', checkAuth, runCode);

router.delete('/delete/:id', checkAuth, checkAdminRole, deleteTask)

export default router;