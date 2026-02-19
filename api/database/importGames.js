// File: api/database/importGames.js
import { config } from "dotenv";
import { sequelize, Game } from "./models/index.js";

config(); // Charge .env

const API_KEY = process.env.API_KEY;

const RAWG_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&ordering=-rating&metacritic=80,100`; // Ajustez page_size si nécessaire

async function fetchGames() {
  let allGames = [];

  for (let page = 1; page <= 3; page++) {
    const res = await fetch(`${RAWG_URL}&page=${page}`);
    if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
    const data = await res.json();
    allGames = allGames.concat(data.results);
  }

  return allGames; // ≈120 jeux;
}

async function fetchGameDetails(gameId) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`,
  );
  if (!res.ok)
    throw new Error(`RAWG API error for game ${gameId}: ${res.status}`);
  const data = await res.json();
  return data;
}
export async function importRAWGGames() {
  await sequelize.authenticate(); // Vérifie la connexion à la base de données
  console.log("✅ DB CONNECTED");

  await sequelize.query(`
      TRUNCATE TABLE "challenges", "games"
      RESTART IDENTITY
      CASCADE;
    `);
  console.log("🗑️ Tous les anciens jeux supprimés");

  const games = await fetchGames(); // Récupère les jeux depuis l'API RAWG
  console.log(`🔹 ${games.length} jeux récupérés depuis RAWG`);
  for (const g of games) {
    try {
      const gameDetails = await fetchGameDetails(g.id); // Récupère les détails du jeu

      const platformNames =
        g.platforms?.map((p) => p.platform.name).join(", ") || null;
      const genreNames = g.genres?.map((g) => g.name).join(", ") || null;

      await Game.upsert({
        // Utilise upsert pour éviter les doublons et mettre à jour si nécessaire
        rawgId: g.id,
        title: g.name,
        description: gameDetails.description_raw || null, // Peut être vide, RAWG ne donne pas toujours ce champ
        image: g.background_image,
        releaseDate: g.released,
        rating: g.rating,
        platform: platformNames,
        genre: genreNames,
      });
    } catch (err) {
      console.warn(`⚠️ Jeu ignoré (ID ${g.id}) :`, err.message);
      continue;
    }
  }

  console.log("✅ Import terminé avec succès");
  process.exit();
}

// importRAWGGames();
