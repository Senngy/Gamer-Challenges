// File: challenge.model.js

import { sequelize } from '../connection.js';
import { Model, DataTypes } from 'sequelize';

export class Challenge extends Model {}

// Définition du modèle "Challenge"
// Le modèle "Challenge" représente les défis associés aux jeux
// Il contient des informations telles que le titre, la description, les règles,
Challenge.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rules: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    challenge_likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    game_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'games',
        key: 'id',
      },
    },
  },
  {
    tableName: 'challenges',
    sequelize,
    timestamps: true, // Ajoute createdAt / updatedAt
    underscored: true, // Utilise snake_case pour les colonnes
  }
);