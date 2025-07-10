// import gamesData from './03.seedgame.js'; // Import des données de jeux
import { User, Game, Challenge, Participation } from '../models/index.js';
import { sequelize } from '../models/index.js';
import { scrypt } from '../../utils/scrypt.js';
import { importRAWGGames } from '../importGames.js';


console.log('🔄 Réinitialisation de la base...');
await sequelize.sync({ force: true }); // ⚠️ Supprime toutes les données (à ne pas faire en prod)

//📦 Création des utilisateurs
console.log('👤 Création des utilisateurs...');

const password1 = scrypt.hash('motdepasse1');
const password2 = scrypt.hash('motdepasse2');
const password3 = scrypt.hash('motdepasse3');

const user1 = await User.create({
  pseudo: 'Jules95',
  email: 'jules@example.com',
  password: password1,
});
const user2 = await User.create({
  pseudo: 'LaraCroft',
  email: 'lara@example.com',
  password: password2,
});
const user3 = await User.create({
  pseudo: 'AlexDev',
  email: 'alex@example.com',
  password: password3,
});

// 🕹️ Insertion des jeux du catalogue
// await Game.bulkCreate(gamesData);


// 🎮 Création des jeux
await importRAWGGames(40);
console.log('🎮 Création des jeux...');

/*
const game1 = await Game.create({
  title: 'Call of Duty: Modern Warfare',
  image: 'cod.jpg',
  description: 'FPS militaire',
  platform: 'PC,PS5',
});
const game2 = await Game.create({
  title: 'Forza Horizon 5',
  image: 'forza.jpg',
  description: 'Course automobile',
  platform: 'Xbox,PC',
});
const game3 = await Game.create({
  title: 'League of Legends',
  image: 'lol.jpg',
  description: 'MOBA compétitif',
  platform: 'PC',
});
*/

// 🏆 Création des défis (challenges)
console.log('🏆 Création des challenges...');
const challenge1 = await Challenge.create({
  title: 'Tuer 10 ennemis en 3 minutes',
  description: 'Défi rapidité multijoueur',
  rules: 'Pas de grenades, pas de véhicules',
  game_by: 1,
  created_by: user1.id,
});

const challenge2 = await Challenge.create({
  title: 'Gagner une course en difficulté max',
  description: 'Conduite extrême',
  rules: 'Pas de rewind, IA max',
  game_by: 2,
  created_by: user2.id,
});

const challenge3 = await Challenge.create({
  title: 'Faire un pentakill en ranked',
  description: 'Objectif ultime',
  rules: 'En partie classée uniquement',
  game_by: 3,
  created_by: user3.id,
});


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
