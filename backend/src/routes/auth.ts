import { Router, Request, Response, RequestHandler } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

const router = Router();

const registerHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { username, password } = req.body as { username: string; password: string };

    if (!username || !password) {
      res.status(400).json({ 
        error: 'Registration failed', 
        details: 'Both username and password are required'
      });
      return;
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      res.status(409).json({
        error: 'Registration failed',
        details: 'Username already exists'
      });
      return;
    }

    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret');
    res.json({ token });
    return;
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      error: 'Registration failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
    return;
  }
};

const loginHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { username, password } = req.body as { username: string; password: string };
    const user = await User.findOne({ where: { username } });

    if (!user || !user.validatePassword(password)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret');
    res.json({ token });
    return;
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
    return;
  }
};

router.post('/register', registerHandler);
router.post('/login', loginHandler);

export default router;
