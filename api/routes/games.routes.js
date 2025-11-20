import express from 'express';
import { getAll, getById, getChallengesByGameId, getTopGames, getRandomGames, searchGames } from '../controllers/games.controller.js';


const router = express.Router();

/**
 * Returns a complete list of all available games in the database with pagination support
 *
 * @summary Get all games
 * @security Optional JWT token for authenticated requests
 *
 * @returns {Array<object>} Array of game objects containing:
 * - id: Game unique identifier
 * - name: Game title
 * - description: Game description
 * - genre: Game genre
 * - releaseDate: Game release date
 * - coverImage: Game cover image URL
 * - challengesCount: Number of challenges created for this game
 * @param req
 * @param queries - Optional pagination parameters (page, limit)
 */
router.get('/', getAll)

/**
 * Searches and returns games matching the provided search query with fuzzy matching support
 *
 * @summary Search games by name
 * @security Optional JWT token for authenticated requests
 *
 * @returns {Array<object>} Array of game objects matching the search criteria containing:
 * - id: Game unique identifier
 * - name: Game title
 * - description: Game description
 * - genre: Game genre
 * - coverImage: Game cover image URL
 * - relevanceScore: Search result relevance score
 * @param req
 * @param queries - Required search parameter (q, searchTerm)
 */
router.get('/search', searchGames)

/**
 * Returns the most popular games ranked by number of associated challenges and participations
 *
 * @summary Get top games
 * @security Optional JWT token for authenticated requests
 *
 * @returns {Array<object>} Array of top games containing:
 * - id: Game unique identifier
 * - name: Game title
 * - coverImage: Game cover image URL
 * - challengesCount: Number of challenges for this game
 * - participationsCount: Total participations across all challenges
 * - ranking: Game position in the ranking
 * @param req
 * @param queries - Optional limit parameter
 */
router.get('/top', getTopGames)

/**
 * Returns a list of randomly selected games for discovery purposes
 *
 * @summary Get random games
 * @security Optional JWT token for authenticated requests
 *
 * @returns {Array<object>} Array of random game objects containing:
 * - id: Game unique identifier
 * - name: Game title
 * - description: Game description
 * - genre: Game genre
 * - coverImage: Game cover image URL
 * @param req
 * @param queries - Optional limit parameter
 */
router.get('/random', getRandomGames)

/**
 * Returns detailed information about a specific game including all associated metadata
 *
 * @summary Get game details by ID
 * @security Optional JWT token for authenticated requests
 *
 * @returns {object} Game object containing:
 * - id: Game unique identifier
 * - name: Game title
 * - description: Game description
 * - genre: Game genre
 * - releaseDate: Game release date
 * - coverImage: Game cover image URL
 * - publisher: Game publisher
 * - challengesCount: Number of challenges
 * - participationsCount: Total participations
 * - created_at: Game entry creation date
 * @param req - Express request with game ID in params
 * @param res - Express response object
 */
router.get('/:id', getById)

/**
 * Returns all challenges created for a specific game with pagination support
 *
 * @summary Get challenges for a specific game
 * @security Optional JWT token for authenticated requests
 *
 * @returns {Array<object>} Array of challenge objects containing:
 * - id: Challenge unique identifier
 * - title: Challenge title
 * - description: Challenge description
 * - difficulty: Challenge difficulty level
 * - creator: Creator user information
 * - participationsCount: Number of participations
 * - likesCount: Number of likes
 * - created_at: Challenge creation date
 * @param req - Express request with game ID in params
 * @param queries - Optional pagination parameters (page, limit)
 */
router.get('/:id/challenges', getChallengesByGameId)

export default router;