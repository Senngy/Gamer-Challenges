import "dotenv/config"; // Charge les variables d'environnement depuis le fichier .env
import cors from "cors"; // Middleware pour gérer les requêtes cross-origin
import express from "express"; // Framework web pour Node.js
import mainRouter from "./routes/main.routes.js"; // Routeur principal contenant toutes les routes
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from "./middlewares/common.middleware.js";

const PORT = process.env.PORT || 3000; // Port du serveur (variable d'environnement ou 3000 par défaut)

const app = express(); // Création de l'application Express

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = { // Configuration CORS pour autoriser les requêtes depuis le client
  origin: 'http://localhost:5173', // URL du client frontend (Vite dev server)
  credentials: true, // Autorise l'envoi de cookies et headers d'authentification
};

app.use(cors(corsOptions)); // Application du middleware CORS avec options
app.use(express.json()); // Middleware pour parser le JSON des requêtes

// Sert le dossier public/uploads en statique pour que les images soient accessibles via URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/", mainRouter); // Toutes les routes API sont préfixées par "/"

// Gestion 404
app.use((req, res, next) => {
  res.status(404).json({ error: true, message: "Route non trouvée" });
});

// Gestion globale des erreurs
app.use(errorHandler);

app.listen(PORT, () => { // Démarrage du serveur sur le port spécifié
  console.log(`Server is running on port at http://localhost:${PORT}`); // Message de confirmation
});
