import express from "express"; // Framework Express pour créer le routeur
import usersRouter from "./users.routes.js"; // Routes pour la gestion des utilisateurs
import gamesRouter from "./games.routes.js"; // Routes pour la gestion des jeux
import challengesRouter from "./challenges.routes.js"; // Routes pour la gestion des défis
import participationsRouter from "./participations.routes.js"; // Routes pour la gestion des participations
import authRouter from "./auth.routes.js"; // Routes pour l'authentification (login/signup)

const mainRouter = express.Router(); // Création du routeur principal Express

/**
 *
 * @summary Authentication routes
 * @description Group of endpoints for user authentication operations:
 * - User login with credentials
 * - User registration/signup
 * - Get current authenticated user profile
 * - User logout
 * - Password modification
 * - Username/pseudo modification
 * - Account deletion
 * 
 * @security Some endpoints require JWT token authentication
 * 
 * @baseUrl /auth
 * @see auth.routes.js for detailed endpoint documentation
 */
mainRouter.use("/auth", authRouter)

/**
 *
 * @summary User management routes
 * @description Group of endpoints for user profile and statistics management:
 * - Get all users with pagination
 * - Get specific user details with stats
 * - Get top users ranked by challenge likes
 * - Get top users ranked by participation likes
 * - Upload/update user avatar
 * 
 * @security Most endpoints are public, some require JWT token
 * 
 * @baseUrl /users
 * @see users.routes.js for detailed endpoint documentation
 */
mainRouter.use("/users", usersRouter)

/**
 * @summary Game management routes
 * @description Group of endpoints for games and game discovery:
 * - Get all games with pagination
 * - Search games by name/criteria
 * - Get top rated/popular games
 * - Get random games for discovery
 * - Get specific game details
 * - Get all challenges for a specific game
 * 
 * @security All endpoints are public
 * 
 * @baseUrl /games
 * @see games.routes.js for detailed endpoint documentation
 */
mainRouter.use("/games", gamesRouter)

/**
 * @summary Challenge management routes
 * @description Group of endpoints for challenge creation and management:
 * - Get all challenges with filters
 * - Create new challenge (authenticated)
 * - Get specific challenge details
 * - Get challenge participations
 * - Challenge like management (get, add, remove, check status)
 * 
 * @security Some endpoints require JWT token authentication
 * 
 * @baseUrl /challenges
 * @see challenges.routes.js for detailed endpoint documentation
 */
mainRouter.use("/challenges", challengesRouter)

/**
 * @summary Participation management routes
 * @description Group of endpoints for challenge participations and participation engagement:
 * - Create new participation (submit challenge entry)
 * - Participation like management (get, add, remove, check status)
 * 
 * @security Most endpoints require JWT token authentication
 * 
 * @baseUrl /participations
 * @see participations.routes.js for detailed endpoint documentation
 */
mainRouter.use("/participations", participationsRouter)

export default mainRouter; // Export du routeur principal pour utilisation dans app.js