// user.routes.js
import express from 'express';
import upload from '../upload/avatarUpload.js';

import { getAll, getById, getTopUsersByChallengeLikes, getTopUsersByParticipationLikes, updateAvatar } from '../controllers/users.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js'

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of registered users with basic information.
 *     tags:
 *       - Users
 *     parameters:
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
 *         description: List of users
 */
router.get('/', getAll)

/**
 * @swagger
 * /users/topUsersByChallengeLikes:
 *   get:
 *     summary: Get top users by challenge likes
 *     description: Returns users ranked by likes received on their created challenges.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Top users by challenge likes
 */
router.get('/topUsersByChallengeLikes', getTopUsersByChallengeLikes)

/**
 * @swagger
 * /users/topUsersByParticipationLikes:
 *   get:
 *     summary: Get top users by participation likes
 *     description: Returns users ranked by likes received on their participations.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Top users by participation likes
 */
router.get('/topUsersByParticipationLikes', getTopUsersByParticipationLikes)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user details by ID
 *     description: Returns detailed information and stats for a user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get('/:id', getById)

/**
 * @swagger
 * /users/{id}/avatar:
 *   post:
 *     summary: Upload user avatar
 *     description: Allows authenticated user to upload or update their profile avatar image.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/avatar', authenticate, upload.single('avatar'), updateAvatar)



export default router;