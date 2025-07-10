import "dotenv/config"; // Charge les variables d'environnement depuis le fichier .env
import cors from "cors"; // Middleware pour gérer les requêtes cross-origin
import express from "express"; // Framework web pour Node.js
import mainRouter from "./routes/main.routes.js"; // Routeur principal contenant toutes les routes

const PORT = process.env.PORT || 3000; // Port du serveur (variable d'environnement ou 3000 par défaut)

const app = express(); // Création de l'application Express

const corsOptions = { // Configuration CORS pour autoriser les requêtes depuis le client
  origin: 'http://localhost:5173', // URL du client frontend (Vite dev server)
  credentials: true, // Autorise l'envoi de cookies et headers d'authentification
};

app.use(cors(corsOptions)); // Application du middleware CORS avec options
app.use(express.json()); // Middleware pour parser le JSON des requêtes

app.use("/api", mainRouter); // Toutes les routes API sont préfixées par "/api"

app.listen(PORT, () => { // Démarrage du serveur sur le port spécifié
  console.log(`Server is running on port at http://localhost:${PORT}`); // Message de confirmation
});