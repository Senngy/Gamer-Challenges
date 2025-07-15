// File: api/database/importGames.js
import { config } from 'dotenv';
import { sequelize, Game } from './models/index.js';

config(); // Charge .env

const API_KEY = process.env.API_KEY;

const RAWG_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&ordering=-rating`; // Ajustez page_size si nécessaire

async function fetchGames() {
  const res = await fetch(RAWG_URL);
  const data = await res.json();
  return data.results;
}

async function fetchGameDetails(gameId) {
  const res = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
  const data = await res.json();
  return data;
}
export async function importRAWGGames() {
  try {
    await sequelize.authenticate(); // Vérifie la connexion à la base de données
    await sequelize.sync(); // Crée la table si elle n'existe pas

    const games = await fetchGames(); // Récupère les jeux depuis l'API RAWG

   
    for (const g of games) {
      const gameDetails = await fetchGameDetails(g.id); // Récupère les détails du jeu

      const platformNames = g.platforms?.map(p => p.platform.name).join(', ') || null;
      const genreNames = g.genres?.map(g => g.name).join(', ') || null;

      await Game.upsert({ // Utilise upsert pour éviter les doublons et mettre à jour si nécessaire
        rawgId: g.id,
        title: g.name,
        description: gameDetails.description || null, // Peut être vide, RAWG ne donne pas toujours ce champ
        image: g.background_image,
        releaseDate: g.released,
        rating: g.rating,
        platform: platformNames,
        genre: genreNames,
      });
    }

    console.log('✅ Import terminé avec succès');
    // process.exit();
  } catch (err) {
    console.error('❌ Erreur d’importation :', err);
    process.exit(1);
  }
}

// importGames();