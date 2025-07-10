// auth.routes.js
import express from 'express';
import { authenticate, validateUserCreation, validateUserUpdatePassword, validateUserUpdatePseudo } from '../middlewares/auth.middleware.js';
import { login, register, me, logout, modifyPassword, modifyPseudo, deleteAccount } from '../controllers/auth.controller.js';

const router = express.Router();   

router.get('/me', authenticate, me); // Get the current user PRIVATE
router.post('/login', login); // Login a user
router.post('/register', validateUserCreation, register); // Register a new user (signup dans le cahier des charges)
router.post('/logout', authenticate, logout); // Logout a user PRIVATE
router.patch('/me/password', authenticate, validateUserUpdatePassword, modifyPassword); // Update the current user PRIVATE
router.patch('/me/pseudo', authenticate, validateUserUpdatePseudo, modifyPseudo); // Update the current user pseudo PRIVATE
router.delete('/me', authenticate, deleteAccount); // Delete the current user PRIVATE

export default router;