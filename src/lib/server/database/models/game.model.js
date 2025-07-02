// src/lib/server/database/models/Game.js
import { DataTypes } from 'sequelize';

export default function(sequelize) {
  const Game = sequelize.define('Game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    genre: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'games',
    timestamps: true,
    underscored: true
  });

  return Game;
}