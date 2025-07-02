// src/lib/server/database/models/index.js
import { sequelize } from '../connection.js';
import UserModel from './User.js';
import GameModel from './Game.js';
import ChallengeModel from './Challenge.js';
import ParticipationModel from './Participation.js';
import VoteModel from './Vote.js';
import CommentModel from './Comment.js';

// Initialisation des modèles
export const User = UserModel(sequelize);
export const Game = GameModel(sequelize);
export const Challenge = ChallengeModel(sequelize);
export const Participation = ParticipationModel(sequelize);
export const Vote = VoteModel(sequelize);
export const Comment = CommentModel(sequelize);

// 🔗 ASSOCIATIONS
// User associations
User.hasMany(Challenge, { foreignKey: 'createdBy', as: 'createdChallenges' });
User.hasMany(Participation, { foreignKey: 'userId', as: 'participations' });
User.hasMany(Vote, { foreignKey: 'userId', as: 'votes' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });

// Game associations
Game.hasMany(Challenge, { foreignKey: 'gameId', as: 'challenges' });

// Challenge associations
Challenge.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
Challenge.belongsTo(Game, { foreignKey: 'gameId', as: 'game' });
Challenge.hasMany(Participation, { foreignKey: 'challengeId', as: 'participations' });
Challenge.hasMany(Vote, { foreignKey: 'challengeId', as: 'votes' });
Challenge.hasMany(Comment, { foreignKey: 'challengeId', as: 'comments' });

// Participation associations
Participation.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Participation.belongsTo(Challenge, { foreignKey: 'challengeId', as: 'challenge' });
Participation.hasMany(Vote, { foreignKey: 'participationId', as: 'votes' });

// Vote associations (polymorphe : vote sur défi OU participation)
Vote.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Vote.belongsTo(Challenge, { foreignKey: 'challengeId', as: 'challenge' });
Vote.belongsTo(Participation, { foreignKey: 'participationId', as: 'participation' });

// Comment associations
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Comment.belongsTo(Challenge, { foreignKey: 'challengeId', as: 'challenge' });

export { sequelize };