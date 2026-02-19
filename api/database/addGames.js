import { config } from "dotenv";
import { sequelize, Game } from "./models/index.js";

config();

const API_KEY = process.env.API_KEY;

async function fetchGameByName(name) {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(name)}&page_size=1`
  );

  if (!res.ok)
    throw new Error(`RAWG search error for ${name}: ${res.status}`);

  const data = await res.json();
  return data.results[0];
}

async function fetchGameDetails(gameId) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
  );

  if (!res.ok)
    throw new Error(`RAWG details error for ${gameId}: ${res.status}`);

  return await res.json();
}

async function addGameByName(name) {
  try {
    const game = await fetchGameByName(name);

    if (!game) {
      console.log(`❌ Jeu introuvable: ${name}`);
      return;
    }

    const details = await fetchGameDetails(game.id);

    const platformNames =
      game.platforms?.map((p) => p.platform.name).join(", ") || null;

    const genreNames =
      game.genres?.map((g) => g.name).join(", ") || null;

    await Game.upsert({
      rawgId: game.id,
      title: game.name,
      description: details.description_raw || null,
      image: game.background_image,
      releaseDate: game.released,
      rating: game.rating,
      platform: platformNames,
      genre: genreNames,
    });

    console.log(`✅ ${name} ajouté / mis à jour`);
  } catch (err) {
    console.error(`❌ Erreur pour ${name}:`, err.message);
  }
}

async function main() {
  await sequelize.authenticate();
  console.log("✅ DB CONNECTED");

  const gamesToAdd = [
    "Cyberpunk 2077",
    "Apex Legends",
  ];

  for (const name of gamesToAdd) {
    await addGameByName(name);
  }

  console.log("🎉 Ajout terminé");
  process.exit();
}

// main();
