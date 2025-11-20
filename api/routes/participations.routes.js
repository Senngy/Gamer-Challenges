// participations.routes.js
import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { addParticipation, getLikes, addLike, checkIfLiked, deleteLike } from '../controllers/participations.controller.js';
import { validateUserCreationParticipation } from '../middlewares/participation.middleware.js';


const router = express.Router();

/**
 * @summary Create a participation
 * @description Allows authenticated user to participate in a challenge by submitting their entry/proof
 *
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Created participation object containing:
 * - id: Participation unique identifier
 * - user: Participating user information
 * - challenge: Challenge information
 * - submissionContent: User's submission content
 * - status: Participation status (typically "pending")
 * - likesCount: 0 (new participation)
 * - created_at: Participation creation timestamp
 * @param req - Express request with participation data in body (challengeId, submissionContent)
 * @param res - Express response object
 * @param next - Express next middleware function
 */
router.post('/', authenticate, validateUserCreationParticipation, addParticipation)

/**
 * @summary Get participation likes
 * @description Returns the list of users who liked this participation and the total likes count. Public endpoint.
 *
 * @security Optional JWT token for authenticated requests
 *
 * @returns {object} Likes information containing:
 * - likesCount: Total number of likes
 * - likes: Array of user objects who liked the participation (id, username, avatar)
 * @param req - Express request with participation ID in params
 * @param res - Express response object
 */
router.get('/:id/likes', getLikes)

/**
 * @summary Add like to participation
 * @description Allows authenticated user to like a participation. Prevents duplicate likes from same user.
 *
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Updated participation likes information containing:
 * - likesCount: New total likes count
 * - message: Success message
 * - liked: true
 * @param req - Express request with participation ID in params
 * @param res - Express response object
 */
router.post('/:id/likes', authenticate, addLike)

/**
 * @summary Remove like from participation
 * @description Allows authenticated user to remove their like from a participation
 *
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Updated participation likes information containing:
 * - likesCount: New total likes count
 * - message: Success message
 * - liked: false
 * @param req - Express request with participation ID in params
 * @param res - Express response object
 */
router.delete('/:id/likes', authenticate, deleteLike)

/**
 * @summary Check if user liked participation
 * @description Checks whether the authenticated user has liked this participation
 *
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Like status information containing:
 * - isLiked: Boolean indicating if user liked the participation
 * - likesCount: Total likes count for the participation
 * @param req - Express request with participation ID in params
 * @param res - Express response object
 */
router.get('/:id/likes/status', authenticate, checkIfLiked)
export default router;