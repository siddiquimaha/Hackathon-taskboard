import express from 'express';
import Task from '../modals/Task.js';

const router = express.Router();

// Create new task
router.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});

export default router;
