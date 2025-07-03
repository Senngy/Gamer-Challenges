// src/lib/server/database/models/index.js
import { sequelize } from '../connection.js';

import { Challenge } from './challenge.model.js';
import { Game } from './game.model.js';
import { User } from './user.model.js';
import { Participation } from './participation.model.js';

// Initialisation des modèles
/*
const User = UserModel(sequelize);
const Game = GameModel(sequelize);
const Challenge = ChallengeModel(sequelize);
const Participation = ParticipationModel(sequelize);
*/

// 🔗 ASSOCIATIONS
// User associations
User.hasMany(Challenge, { foreignKey: 'created_by', as: 'challenge_created' });
User.hasMany(Participation, { foreignKey: 'user_id', as: 'participant' });
// User.hasMany(Vote, { foreignKey: 'user_id', as: 'votes' });
// User.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });

// Game associations
Game.hasMany(Challenge, { foreignKey: 'game_id', as: 'challenges' });

// Challenge associations
Challenge.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Challenge.belongsTo(Game, { foreignKey: 'game_id', as: 'game' });
Challenge.hasMany(Participation, { foreignKey: 'challenge_id', as: 'participations' });
// Challenge.hasMany(Vote, { foreignKey: 'challenge_id', as: 'votes' });
// Challenge.hasMany(Comment, { foreignKey: 'challenge_id', as: 'comments' });

// Participation associations
Participation.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Participation.belongsTo(Challenge, { foreignKey: 'challenge_id', as: 'challenge' });
// Participation.hasMany(Vote, { foreignKey: 'participation_id', as: 'votes' });

// Vote associations (polymorphe : vote sur défi OU participation)
/* 
Vote.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Vote.belongsTo(Challenge, { foreignKey: 'challenge_id', as: 'challenge' });
Vote.belongsTo(Participation, { foreignKey: 'participation_id', as: 'participation' });
*/

// Comment associations
/*
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Comment.belongsTo(Challenge, { foreignKey: 'challenge_id', as: 'challenge' });
*/

export { sequelize, User, Game, Challenge, Participation };