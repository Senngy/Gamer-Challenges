import { User, Game, Challenge, Participation } from '../models/index.js';
import { sequelize } from '../models/index.js';

console.log("🔄 Réinitialisation de la base...");
await sequelize.sync({ force: true }); // ⚠️ Supprime toutes les données (à ne pas faire en prod)

// 📦 Création des utilisateurs
console.log("👤 Création des utilisateurs...");
const user1 = await User.create({ username: "jules", email: "jules@example.com", password: "hashedpass1" });
const user2 = await User.create({ username: "lara", email: "lara@example.com", password: "hashedpass2" });
const user3 = await User.create({ username: "alex", email: "alex@example.com", password: "hashedpass3" });

// 🎮 Création des jeux
console.log("🎮 Création des jeux...");
const game1 = await Game.create({ title: "Call of Duty: Modern Warfare", image: "cod.jpg", description: "FPS militaire", platform_tags: "PC,PS5" });
const game2 = await Game.create({ title: "Forza Horizon 5", image: "forza.jpg", description: "Course automobile", platform_tags: "Xbox,PC" });
const game3 = await Game.create({ title: "League of Legends", image: "lol.jpg", description: "MOBA compétitif", platform_tags: "PC" });

// 🏆 Création des défis (challenges)
console.log("🏆 Création des challenges...");
const challenge1 = await Challenge.create({
  title: "Tuer 10 ennemis en 3 minutes",
  description: "Défi rapidité multijoueur",
  rules: "Pas de grenades, pas de véhicules",
  game_id: game1.id,
  user_id: user1.id
});

const challenge2 = await Challenge.create({
  title: "Gagner une course en difficulté max",
  description: "Conduite extrême",
  rules: "Pas de rewind, IA max",
  game_id: game2.id,
  user_id: user2.id
});

const challenge3 = await Challenge.create({
  title: "Faire un pentakill en ranked",
  description: "Objectif ultime",
  rules: "En partie classée uniquement",
  game_id: game3.id,
  user_id: user3.id
});

// 👥 Création des participations
console.log("🎬 Création des participations...");
await Participation.create({
  user_id: user2.id,
  challenge_id: challenge1.id,
  link: "https://youtu.be/killstreak-cod",
  comment: "Fait en 2m45 !",
  platform_tags: "PC"
});

await Participation.create({
  user_id: user3.id,
  challenge_id: challenge1.id,
  link: "https://youtu.be/cod-fastkill",
  comment: "Pas évident !",
  platform_tags: "PS5"
});

await Participation.create({
  user_id: user1.id,
  challenge_id: challenge2.id,
  link: "https://youtu.be/forza-win",
  comment: "Victoire au dernier virage",
  platform_tags: "Xbox"
});

await Participation.create({
  user_id: user2.id,
  challenge_id: challenge3.id,
  link: "https://youtu.be/pentakill-lol",
  comment: "Pentakill à 35min",
  platform_tags: "PC"
});

console.log("✅ Données de test insérées avec succès !");
await sequelize.close();

// Ce fichier nous évite de créer le fichier `seed_database.sql` en utilisant directement notre ORM Sequelize !

// Pour réviser le SQL, n'hésitez pas à reproduire ce script directement en SQL !
// Et pourquoi pas pour les autres tables également.
