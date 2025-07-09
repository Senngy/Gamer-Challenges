// src/lib/server/database/models/Game.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

export class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    platform: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: 'games',
    sequelize,
  }
);
