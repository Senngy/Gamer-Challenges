import gamesData from './03.seedgame.js'; // Import des données de jeux
import { User, Game, Challenge, Participation } from '../models/index.js';
import { sequelize } from '../models/index.js';

console.log('🔄 Réinitialisation de la base...');
await sequelize.sync({ force: true }); // ⚠️ Supprime toutes les données (à ne pas faire en prod)

//📦 Création des utilisateurs
console.log('👤 Création des utilisateurs...');
const user1 = await User.create({
  pseudo: 'Jules95',
  email: 'jules@example.com',
  password: 'hashedpass1',
});
const user2 = await User.create({
  pseudo: 'LaraCroft',
  email: 'lara@example.com',
  password: 'hashedpass2',
});
const user3 = await User.create({
  pseudo: 'AlexDev',
  email: 'alex@example.com',
  password: 'hashedpass3',
});

// 🕹️ Insertion des jeux du catalogue
await Game.bulkCreate(gamesData);

// 🏆 Création des défis (challenges)
/*
console.log('🏆 Création des challenges...');
const challenge1 = await Challenge.create({
  title: 'Tuer 10 ennemis en 3 minutes',
  description: 'Défi rapidité multijoueur',
  rules: 'Pas de grenades, pas de véhicules',
  game_by: game1.id,
  created_by: user1.id,
});

const challenge2 = await Challenge.create({
  title: 'Gagner une course en difficulté max',
  description: 'Conduite extrême',
  rules: 'Pas de rewind, IA max',
  game_by: game2.id,
  created_by: user2.id,
});

const challenge3 = await Challenge.create({
  title: 'Faire un pentakill en ranked',
  description: 'Objectif ultime',
  rules: 'En partie classée uniquement',
  game_by: game3.id,
  created_by: user3.id,
});
*/

// 👥 Création des participations
console.log('🎬 Création des participations...');
await Participation.create({
  user_id: user2.id,
  challenge_id: challenge1.id,
  media_link: 'https://youtu.be/killstreak-cod',
  description: 'Fait en 2m45 !',
});

await Participation.create({
  user_id: user3.id,
  challenge_id: challenge1.id,
  media_link: 'https://youtu.be/cod-fastkill',
  description: 'Pas évident !',
});

await Participation.create({
  user_id: user1.id,
  challenge_id: challenge2.id,
  media_link: 'https://youtu.be/forza-win',
  description: 'Victoire au dernier virage',
});

await Participation.create({
  user_id: user2.id,
  challenge_id: challenge3.id,
  media_link: 'https://youtu.be/pentakill-lol',
  description: 'Pentakill à 35min',
});

console.log('✅ Données de test insérées avec succès !');
await sequelize.close();

// Ce fichier nous évite de créer le fichier `seed_database.sql` en utilisant directement notre ORM Sequelize !

// Pour réviser le SQL, n'hésitez pas à reproduire ce script directement en SQL !
// Et pourquoi pas pour les autres tables également.
