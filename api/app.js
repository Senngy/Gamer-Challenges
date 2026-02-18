// app.js Fichier principal de l'application Express

import "dotenv/config"; // Charge les variables d'environnement depuis le fichier .env
import cors from "cors"; // Middleware pour gérer les requêtes cross-origin
import express from "express"; // Framework web pour Node.js
import mainRouter from "./routes/main.routes.js"; // Routeur principal contenant toutes les routes
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from "./middlewares/common.middleware.js";
import { setupSwagger } from "./swagger.js";
import { sequelize } from "./database/connection.js"; // Import de la connexion à la base de données Sequelize
import supabase, { testSupabaseBucket } from './src/lib/server/supabaseClient.js'

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`; // Port du serveur (variable d'environnement ou 3000 par défaut)
const URL_CLIENT = process.env.URL_CLIENT; // URL du client frontend (Vite dev server)

const app = express(); // Création de l'application Express

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allowedOrigins = [URL_CLIENT, 'http://localhost:5173', 'http://localhost:4173', `http://localhost:${PORT}`]; // Origines autorisées pour les requêtes CORS];

const corsOptions = {
  origin: function (origin, callback) {
    // Autoriser les requêtes sans origin (Postman, serveur-to-serveur)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions)); // Application du middleware CORS avec options
app.use(express.json()); // Middleware pour parser le JSON des requêtes
// Sert le dossier public/uploads en statique pour que les images soient accessibles via URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/", mainRouter); // Toutes les routes API sont préfixées par "/"

// Swagger UI
setupSwagger(app);

// Gestion 404
app.use((req, res, next) => {
  res.status(404).json({ error: true, message: "Route non trouvée" });
});

// Gestion globale des erreurs
app.use(errorHandler);

sequelize.authenticate()
  .then(async () => {
    console.log("✅ DB CONNECTED");

    // 🔹 Test du bucket Supabase avant de lancer le serveur
    const bucketOk = await testSupabaseBucket();
    if (!bucketOk) {
      console.warn("⚠️ Check SUPABASE_SERVICE_KEY and bucket 'gc-uploads'.");
    }

    app.listen(PORT, () => {
      console.log('Connected to DB 🗄️:', process.env.DB_HOST, process.env.DB_NAME);
      console.log(`Server 🖥️ is running on port at ${BASE_URL}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB ERROR:", err);
  });

