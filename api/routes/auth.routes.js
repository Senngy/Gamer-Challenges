// auth.routes.js
import express from 'express';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();   

// router.get('/me',); // Get the current user PRIVATE
router.post('/login', login); // Login a user
router.post('/register',); // Register a new user (signup dans le cahier des charges)
// router.post('/logout',); // Logout a user PRIVATE

export default router;