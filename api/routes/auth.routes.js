import express from 'express';
import { authenticate, validateUserCreation, validateUserLogin, validateUserUpdatePassword, validateUserUpdatePseudo } from '../middlewares/auth.middleware.js';
import { login, register, me, logout, modifyPassword, modifyPseudo, deleteAccount } from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     description: Returns the profile information of the currently authenticated user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authenticate, me)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with email and password, returns JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: exemple@mail.com
 *               password:
 *                 type: string
 *                 example: Motdepasse123!
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validateUserLogin, login)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     description: Creates a new user account with email, username and password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: User already exists
 */
router.post('/register', validateUserCreation, register)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     description: Logs out the current authenticated user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', authenticate, logout)

/**
 * @swagger
 * /auth/me/password:
 *   patch:
 *     summary: Update user password
 *     description: Allows authenticated user to change their account password
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch('/me/password', authenticate, validateUserUpdatePassword, modifyPassword)

/**
 * @swagger
 * /auth/me/pseudo:
 *   patch:
 *     summary: Update user username
 *     description: Allows authenticated user to change their username
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pseudo
 *             properties:
 *               pseudo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Username updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch('/me/pseudo', authenticate, validateUserUpdatePseudo, modifyPseudo)

/**
 * @swagger
 * /auth/me:
 *   delete:
 *     summary: Delete user account
 *     description: Permanently deletes the current authenticated user account
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/me', authenticate, deleteAccount)

export default router;
