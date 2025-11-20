import express from 'express';
import { authenticate, validateUserCreation, validateUserLogin, validateUserUpdatePassword, validateUserUpdatePseudo } from '../middlewares/auth.middleware.js';
import { login, register, me, logout, modifyPassword, modifyPseudo, deleteAccount } from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * Returns the profile information of the currently authenticated user
 *
 * @summary Get current authenticated user
 * @description Returns the profile information of the currently authenticated user
 * @security JWT token required - User must be authenticated
 * 
 *
 * @returns {object} Current user object containing:
 * - id: User unique identifier
 * - username: User's username
 * - email: User's email address
 * - avatar: User's avatar URL
 * - bio: User's biography
 * - created_at: User account creation date
 * - updated_at: User profile last update date
 * @param req - Express request with JWT token
 * @param res - Express response object
 */
router.get('/me', authenticate, me)

/**
 * Authenticates a user with email and password credentials, returns JWT token for session
 *
 * @summary User login
 * @security No authentication required
 *
 * @returns {object} Authentication response containing:
 * - token: JWT authentication token for subsequent requests
 * - user: User object with id, username, email, avatar
 * - message: Success message
 * @param req - Express request with email and password in body
 * @param res - Express response object
 */
router.post('/login', validateUserLogin, login)

/**
 * Creates a new user account with email, username and password credentials
 *
 * @summary User registration
 * @security No authentication required
 *
 * @returns {object} Registration response containing:
 * - token: JWT authentication token for immediate session
 * - user: New user object with id, username, email, avatar
 * - message: Account created successfully message
 * @param req - Express request with email, username and password in body
 * @param res - Express response object
 */
router.post('/register', validateUserCreation, register)

/**
 * Logs out the current authenticated user and invalidates their session token
 *
 * @summary User logout
 * @security bearerAuth JWT token required - User must be authenticated
 *
 * @returns {object} Logout confirmation containing:
 * - message: Success message confirming logout
 * @param req - Express request with JWT token
 * @param res - Express response object
 */
router.post('/logout', authenticate, logout)

/**
 * Allows authenticated user to change their account password
 *
 * @summary Update user password
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Password update confirmation containing:
 * - message: Success message confirming password change
 * - user: Updated user object
 * @param req - Express request with old and new password in body
 * @param res - Express response object
 */
router.patch('/me/password', authenticate, validateUserUpdatePassword, modifyPassword)

/**
 * Allows authenticated user to change their username/pseudo
 *
 * @summary Update user username
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Username update confirmation containing:
 * - message: Success message confirming pseudo change
 * - user: Updated user object with new username
 * @param req - Express request with new pseudo in body
 * @param res - Express response object
 */
router.patch('/me/pseudo', authenticate, validateUserUpdatePseudo, modifyPseudo)

/**
 * Permanently deletes the current authenticated user account and all associated data
 *
 * @summary Delete user account
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Deletion confirmation containing:
 * - message: Success message confirming account deletion
 * @param req - Express request with JWT token
 * @param res - Express response object
 */
router.delete('/me', authenticate, deleteAccount)

export default router;