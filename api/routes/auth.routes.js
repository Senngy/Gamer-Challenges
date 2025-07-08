// auth.routes.js
import express from 'express';
import { authenticate, validateUserCreation } from '../middlewares/auth.middleware.js';
import { login, register, me, logout } from '../controllers/auth.controller.js';

const router = express.Router();   

router.get('/me', authenticate, me); // Get the current user PRIVATE
router.post('/login', login); // Login a user
router.post('/register', validateUserCreation, register); // Register a new user (signup dans le cahier des charges)
router.post('/logout', authenticate, logout); // Logout a user PRIVATE

export default router;