import express from "express"; // Framework Express pour créer le routeur
import usersRouter from "./users.routes.js"; // Routes pour la gestion des utilisateurs
import gamesRouter from "./games.routes.js"; // Routes pour la gestion des jeux
import challengesRouter from "./challenges.routes.js"; // Routes pour la gestion des défis
import participationsRouter from "./participations.routes.js"; // Routes pour la gestion des participations
import authRouter from "./auth.routes.js"; // Routes pour l'authentification (login/signup)

const mainRouter = express.Router(); // Création du routeur principal Express

mainRouter.use("/auth", authRouter)
mainRouter.use("/users", usersRouter)
mainRouter.use("/games", gamesRouter)
mainRouter.use("/challenges", challengesRouter)
mainRouter.use("/participations", participationsRouter)

export default mainRouter; // Export du routeur principal pour utilisation dans app.js