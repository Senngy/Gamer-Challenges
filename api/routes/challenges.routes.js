import express from 'express';

import { authenticate } from '../middlewares/auth.middleware.js';

import { getAll, getById, getChallengeParticipations, create, getLikes, addLike, deleteLike, checkIfLiked } from '../controllers/challenges.controller.js'; // Import des fonctions du controller


import { validateUserCreationChallenge } from '../middlewares/challenge.middleware.js';

const router = express.Router();

/**
 * Returns a paginated list of all available challenges with filters and sorting options
 *
 * @summary Get all challenges
 * @security Optional JWT token for authenticated requests
 *
 * @returns {Array<object>} Array of challenge objects containing:
 * - id: Challenge unique identifier
 * - title: Challenge title
 * - description: Challenge description
 * - difficulty: Challenge difficulty level (easy, medium, hard)
 * - game: Associated game information
 * - creator: Creator user information
 * - participationsCount: Number of participations
 * - likesCount: Number of likes received
 * - created_at: Challenge creation date
 * @param req
 * @param queries - Optional filters (gameId, difficulty, sortBy, page, limit)
 */
router.get('/', getAll)

/**
 * Creates a new challenge for a specific game. User must be authenticated. Validates input data.
 *
 * @summary Create a new challenge
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Created challenge object containing:
 * - id: New challenge unique identifier
 * - title: Challenge title
 * - description: Challenge description
 * - difficulty: Challenge difficulty level
 * - game: Associated game
 * - creator: Creator user information
 * - likesCount: 0 (new challenge)
 * - created_at: Challenge creation timestamp
 * @param req - Express request with challenge data in body (title, description, difficulty, gameId)
 * @param res - Express response object
 * @param next - Express next middleware function
 */
router.post('/', authenticate, validateUserCreationChallenge, create)

/**
 * Returns the list of users who liked this challenge and the total likes count. Public endpoint.
 *
 * @summary Get challenge likes
 * @security Optional JWT token for authenticated requests
 *
 * @returns {object} Likes information containing:
 * - likesCount: Total number of likes
 * - likes: Array of user objects who liked the challenge (id, username, avatar)
 * @param req - Express request with challenge ID in params
 * @param res - Express response object
 */
router.get('/:id/likes', getLikes)

/**
 * @summary Add like to challenge
 * @description Allows authenticated user to like a challenge. Prevents duplicate likes from same user.
 *
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Updated challenge likes information containing:
 * - likesCount: New total likes count
 * - message: Success message
 * - liked: true
 * @param req - Express request with challenge ID in params
 * @param res - Express response object
 */
router.post('/:id/likes', authenticate, addLike)

/**
 * @summary Remove like from challenge
 * @description Allows authenticated user to remove their like from a challenge
 *
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Updated challenge likes information containing:
 * - likesCount: New total likes count
 * - message: Success message
 * - liked: false
 * @param req - Express request with challenge ID in params
 * @param res - Express response object
 */
router.delete('/:id/likes', authenticate, deleteLike)

/**
 * @summary Check if user liked challenge
 * @description Checks whether the authenticated user has liked this challenge
 *
 * @security JWT token required - User must be authenticated
 *
 * @returns {object} Like status information containing:
 * - isLiked: Boolean indicating if user liked the challenge
 * - likesCount: Total likes count for the challenge
 * @param req - Express request with challenge ID in params
 * @param res - Express response object
 */
router.get('/:id/likes/status', authenticate, checkIfLiked)

/**
 * @summary Get challenge details by ID
 * @description Returns detailed information about a specific challenge including creator info and stats
 *
 * @security Optional JWT token for authenticated requests
 *
 * @returns {object} Challenge object containing:
 * - id: Challenge unique identifier
 * - title: Challenge title
 * - description: Challenge description
 * - difficulty: Challenge difficulty level
 * - game: Complete game object
 * - creator: Creator user with id, username, avatar
 * - participationsCount: Number of participations
 * - likesCount: Number of likes
 * - created_at: Challenge creation date
 * - updated_at: Challenge last update date
 * @param req - Express request with challenge ID in params
 * @param res - Express response object
 */
router.get('/:id', getById)

/**
 * @summary Get challenge participations
 * @description Returns all participations for a specific challenge with user and submission details
 *
 * @security Optional JWT token for authenticated requests
 *
 * @returns {Array<object>} Array of participation objects containing:
 * - id: Participation unique identifier
 * - user: Participating user information (id, username, avatar)
 * - challenge: Challenge information
 * - submissionContent: User's submission content or proof
 * - status: Participation status (pending, accepted, rejected)
 * - likesCount: Likes received on this participation
 * - created_at: Participation creation date
 * - updated_at: Participation last update date
 * @param req - Express request with challenge ID in params
 * @param queries - Optional pagination parameters (page, limit)
 */
router.get('/:id/participations', getChallengeParticipations)


export default router;