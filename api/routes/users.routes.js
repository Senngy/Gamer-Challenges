// user.routes.js
import express from 'express';
import upload from '../upload/avatarUpload.js';

import { getAll, getById, getTopUsersByChallengeLikes, getTopUsersByParticipationLikes, updateAvatar } from '../controllers/users.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js'

const router = express.Router();

/**
 * Returns a complete list of all registered users in the system with their basic information
 *
 * @summary Get all users
 * @security Optional JWT token for authenticated requests
 *
 * @returns {Array<object>} Array of user objects containing:
 * - id: User unique identifier
 * - username: User's username
 * - email: User's email address
 * - avatar: User's avatar URL
 * - created_at: User account creation date
 * @param req
 * @param res
 */
router.get('/', getAll)

/**
 * Returns a paginated list of users ranked by the number of likes received on their created challenges
 *
 * @summary Get top users by challenge likes
 * @security Optional JWT token for authenticated requests
 *
 * @returns {Array<object>} Array of top users with:
 * - id: User unique identifier
 * - username: User's username
 * - avatar: User's avatar URL
 * - challengeLikesCount: Total likes received on created challenges
 * - ranking: User's position in the ranking
 * @param req
 * @param queries
 */
router.get('/topUsersByChallengeLikes', getTopUsersByChallengeLikes)

/**
 * Returns a paginated list of users ranked by the number of likes received on their participations
 *
 * @summary Get top users by participation likes
 * @security Optional JWT token for authenticated requests
 *
 * @returns {Array<object>} Array of top users with:
 * - id: User unique identifier
 * - username: User's username
 * - avatar: User's avatar URL
 * - participationLikesCount: Total likes received on participations
 * - ranking: User's position in the ranking
 * @param req
 * @param queries
 */
router.get('/topUsersByParticipationLikes', getTopUsersByParticipationLikes)

/**
 * Returns detailed information about a specific user including stats:
 * - Created challenges count
 * - Participations count
 * - Total likes received
 *
 * @summary Get user details by ID
 * @security Optional JWT token for authenticated requests
 *
 * @returns {object} User object containing:
 * - id: User unique identifier
 * - username: User's username
 * - email: User's email address
 * - avatar: User's avatar URL
 * - bio: User's biography
 * - challengesCount: Number of created challenges
 * - participationsCount: Number of participations
 * - totalLikesCount: Total likes received
 * - created_at: User account creation date
 * - updated_at: User profile last update date
 * @param req - Express request with user ID in params
 * @param res - Express response object
 */
router.get('/:id', getById)

/**
 * Allows authenticated users to upload or update their profile avatar image
 *
 * @summary Upload user avatar
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Updated user object with:
 * - id: User unique identifier
 * - username: User's username
 * - avatar: New avatar URL
 * - avatarUploadedAt: Timestamp of avatar upload
 * - message: Success message confirming avatar update
 * @param req - Express request with user ID in params and multipart form-data file
 * @param res - Express response object
 * @param next - Express next middleware function
 */
router.post('/:id/avatar', authenticate, upload.single('avatar'), updateAvatar)



export default router;