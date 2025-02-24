import { Router, Request, Response } from 'express';
import { Task } from '../models/Task';

const router = Router();

// Get all tasks for the authenticated user
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({ 
      where: { userId: req.user?.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a new task
router.post('/', async (req: Request, res: Response) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user?.id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

// Update a task
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { 
        id: req.params.id,
        userId: req.user?.id
      }
    });
    if (updated) {
      const updatedTask = await Task.findOne({ 
        where: { 
          id: req.params.id,
          userId: req.user?.id
        }
      });
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await Task.destroy({
      where: { 
        id: req.params.id,
        userId: req.user?.id
      }
    });
    if (deleted) {
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
});

export default router;
