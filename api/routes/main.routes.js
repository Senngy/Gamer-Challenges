import express from "express"; // Framework Express pour créer le routeur
import usersRouter from "./users.routes.js"; // Routes pour la gestion des utilisateurs
import gamesRouter from "./games.routes.js"; // Routes pour la gestion des jeux
import challengesRouter from "./challenges.routes.js"; // Routes pour la gestion des défis
import participationsRouter from "./participations.routes.js"; // Routes pour la gestion des participations
import authRouter from "./auth.routes.js"; // Routes pour l'authentification (login/signup)

const mainRouter = express.Router(); // Création du routeur principal Express

mainRouter.use("/auth", authRouter); // Routes d'authentification via /auth
mainRouter.use("/users", usersRouter); // Routes utilisateurs via /users
mainRouter.use("/games", gamesRouter); // Routes jeux via /games
mainRouter.use("/challenges", challengesRouter); // Routes défis via /challenges
mainRouter.use("/participations", participationsRouter); // Routes participations via /participations

export default mainRouter; // Export du routeur principal pour utilisation dans app.js