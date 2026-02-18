// participations.routes.js
import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { addParticipation, getLikes, addLike, checkIfLiked, deleteLike } from '../controllers/participations.controller.js';
import { validateUserCreationParticipation } from '../middlewares/participation.middleware.js';


const router = express.Router();

/**
 * @swagger
 * /participations:
 *   post:
 *     summary: Create a participation
 *     description: Allows an authenticated user to submit a participation for a challenge.
 *     tags:
 *       - Participations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - challengeId
 *               - submissionContent
 *             properties:
 *               challengeId:
 *                 type: integer
 *               submissionContent:
 *                 type: string
 *     responses:
 *       201:
 *         description: Participation created
 *       400:
 *         description: Validation error
 */
router.post('/', authenticate, validateUserCreationParticipation, addParticipation)

/**
 * @swagger
 * /participations/{id}/likes:
 *   get:
 *     summary: Get participation likes
 *     description: Returns list of users who liked the participation and total likes count.
 *     tags:
 *       - Participations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Participation ID
 *     responses:
 *       200:
 *         description: Likes information
 */
router.get('/:id/likes', getLikes)

/**
 * @swagger
 * /participations/{id}/likes:
 *   post:
 *     summary: Add like to participation
 *     description: Authenticated user likes a participation. Prevents duplicates.
 *     tags:
 *       - Participations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Participation ID
 *     responses:
 *       200:
 *         description: Like added
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/likes', authenticate, addLike)

/**
 * @swagger
 * /participations/{id}/likes:
 *   delete:
 *     summary: Remove like from participation
 *     description: Authenticated user removes their like.
 *     tags:
 *       - Participations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Participation ID
 *     responses:
 *       200:
 *         description: Like removed
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id/likes', authenticate, deleteLike)

/**
 * @swagger
 * /participations/{id}/likes/status:
 *   get:
 *     summary: Check if user liked participation
 *     description: Returns whether authenticated user has liked this participation and total likes count.
 *     tags:
 *       - Participations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Participation ID
 *     responses:
 *       200:
 *         description: Like status
 *       401:
 *         description: Unauthorized
 */
router.get('/:id/likes/status', authenticate, checkIfLiked)
export default router;