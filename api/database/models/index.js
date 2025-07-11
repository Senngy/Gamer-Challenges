import { sequelize } from '../connection.js';

import { Challenge } from './challenge.model.js';
import { Game } from './game.model.js';
import { User } from './user.model.js';
import { Participation } from './participation.model.js';

import { Like } from './like.model.js';

// import { Comment } from './comment.model.js';


console.log('⚙️  Models and associations initialized');

// Initialisation des modèles

// 🔗 ASSOCIATIONS

// User associations
User.hasMany(Challenge, { foreignKey: 'created_by', as: 'challenge_created' });
User.hasMany(Participation, { foreignKey: 'user_id', as: 'participant' });

// User.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });

// Game associations
Game.hasMany(Challenge, { foreignKey: 'game_id', as: 'challenges' });

// Challenge associations
Challenge.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Challenge.belongsTo(Game, { foreignKey: 'game_id', as: 'game' });
Challenge.hasMany(Participation, {
  foreignKey: 'challenge_id',
  as: 'participations',
});
// Challenge.hasMany(Comment, { foreignKey: 'challenge_id', as: 'comments' });

// Participation associations
Participation.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Participation.belongsTo(Challenge, {
  foreignKey: 'challenge_id',
  as: 'challenge',
});

// NEW Likes associations
User.hasMany(Like, {
  foreignKey: 'user_id',
  as: 'likes'
});
Like.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

/*
// Comment associations
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Comment.belongsTo(Challenge, { foreignKey: 'challenge_id', as: 'challenge' });
*/

// ✅ Export propre
export { sequelize, User, Game, Challenge, Participation, Like };
