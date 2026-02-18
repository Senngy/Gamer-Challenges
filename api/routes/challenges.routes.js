import express from 'express';

import { authenticate } from '../middlewares/auth.middleware.js';

import { getAll, getById, getChallengeParticipations, create, getLikes, addLike, deleteLike, checkIfLiked } from '../controllers/challenges.controller.js'; // Import des fonctions du controller


import { validateUserCreationChallenge } from '../middlewares/challenge.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /challenges:
 *   get:
 *     summary: Get all challenges
 *     description: Returns a paginated list of all challenges with optional filters and sorting.
 *     tags:
 *       - Challenges
 *     parameters:
 *       - in: query
 *         name: gameId
 *         schema:
 *           type: integer
 *         description: Filter by game ID
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *         description: Filter by difficulty level
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort field
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of challenges
 */
router.get('/', getAll)

/**
 * @swagger
 * /challenges:
 *   post:
 *     summary: Create a new challenge
 *     description: Allows authenticated user to create a new challenge for a specific game.
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - difficulty
 *               - gameId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               gameId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Challenge created
 *       400:
 *         description: Validation error
 */
router.post('/', authenticate, validateUserCreationChallenge, create)

/**
 * @swagger
 * /challenges/{id}/likes:
 *   get:
 *     summary: Get challenge likes
 *     description: Returns list of users who liked the challenge and total likes count.
 *     tags:
 *       - Challenges
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Challenge ID
 *     responses:
 *       200:
 *         description: Likes information
 */
router.get('/:id/likes', getLikes)

/**
 * @swagger
 * /challenges/{id}/likes:
 *   post:
 *     summary: Add like to challenge
 *     description: Authenticated user likes a challenge. Prevents duplicates.
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Challenge ID
 *     responses:
 *       200:
 *         description: Like added
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/likes', authenticate, addLike)

/**
 * @swagger
 * /challenges/{id}/likes:
 *   delete:
 *     summary: Remove like from challenge
 *     description: Authenticated user removes their like.
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Challenge ID
 *     responses:
 *       200:
 *         description: Like removed
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id/likes', authenticate, deleteLike)

/**
 * @swagger
 * /challenges/{id}/likes/status:
 *   get:
 *     summary: Check if user liked challenge
 *     description: Returns whether authenticated user has liked this challenge and total likes count.
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Challenge ID
 *     responses:
 *       200:
 *         description: Like status
 *       401:
 *         description: Unauthorized
 */
router.get('/:id/likes/status', authenticate, checkIfLiked)

/**
 * @swagger
 * /challenges/{id}:
 *   get:
 *     summary: Get challenge details by ID
 *     description: Returns detailed information about a specific challenge.
 *     tags:
 *       - Challenges
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Challenge ID
 *     responses:
 *       200:
 *         description: Challenge details
 *       404:
 *         description: Challenge not found
 */
router.get('/:id', getById)

/**
 * @swagger
 * /challenges/{id}/participations:
 *   get:
 *     summary: Get challenge participations
 *     description: Returns all participations for a specific challenge.
 *     tags:
 *       - Challenges
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Challenge ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of participations for the challenge
 */
router.get('/:id/participations', getChallengeParticipations)


export default router;