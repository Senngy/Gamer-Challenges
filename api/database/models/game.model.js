// src/lib/server/database/models/Game.js
import { Model, DataTypes } from 'sequelize'; // Import des outils Sequelize
import { sequelize } from '../connection.js'; // Connexion à la BDD

export class Game extends Model {} // Déclaration du modèle Game

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
