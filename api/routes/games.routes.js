import express from 'express';
import { getAll, getById, getChallengesByGameId, getTopGames, getRandomGames, searchGames } from '../controllers/games.controller.js';


const router = express.Router();

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games
 *     description: Returns a paginated list of all games.
 *     tags:
 *       - Games
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   genre:
 *                     type: string
 *                   releaseDate:
 *                     type: string
 *                   coverImage:
 *                     type: string
 *                   challengesCount:
 *                     type: integer
 */
router.get('/', getAll)

/**
 * @swagger
 * /games/search:
 *   get:
 *     summary: Search games by name
 *     description: Search games using a query string (fuzzy matching).
 *     tags:
 *       - Games
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query or term
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   genre:
 *                     type: string
 *                   coverImage:
 *                     type: string
 *                   relevanceScore:
 *                     type: number
 */
router.get('/search', searchGames)

/**
 * @swagger
 * /games/top:
 *   get:
 *     summary: Get top games
 *     description: Returns the most popular games ranked by challenges and participations.
 *     tags:
 *       - Games
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Max number of top games to return
 *     responses:
 *       200:
 *         description: List of top games
 */
router.get('/top', getTopGames)


/**
 * @swagger
 * /games/random:
 *   get:
 *     summary: Get random games
 *     description: Returns a list of randomly selected games for discovery.
 *     tags:
 *       - Games
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of random games to return
 *     responses:
 *       200:
 *         description: Random games list
 */
router.get('/random', getRandomGames)


/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get game details by ID
 *     description: Returns detailed information about a single game.
 *     tags:
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Game details
 *       404:
 *         description: Game not found
 */
router.get('/:id', getById)

/**
 * @swagger
 * /games/{id}/challenges:
 *   get:
 *     summary: Get challenges for a specific game
 *     description: Returns challenges created for the given game ID with pagination.
 *     tags:
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Game ID
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
 *         description: List of challenges for the game
 */
router.get('/:id/challenges', getChallengesByGameId)

export default router;