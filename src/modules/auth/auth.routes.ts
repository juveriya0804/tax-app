import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();
const authController = new AuthController();

// Registration endpoint
router.post('/register', authController.register);

// Login endpoint
router.post('/login', authController.login);

export default router;
