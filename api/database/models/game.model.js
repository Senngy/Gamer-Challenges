// src/lib/server/database/models/Game.js
import { Model, DataTypes } from 'sequelize'; // Import des outils Sequelize
import { sequelize } from '../connection.js'; // Connexion à la BDD

export class Game extends Model {} // Déclaration du modèle Game

Game.init(
  {
    title: {
      type: DataTypes.STRING(100), // Nom du jeu (max 100 caractères)
      allowNull: false, // Champ obligatoire
    },
    description: {
      type: DataTypes.TEXT, // Description du jeu
      allowNull: true, // Champ optionnel
    },
    image: {
      type: DataTypes.STRING(255), // URL ou nom du fichier image
      allowNull: true, // Champ optionnel
    },
    platform: {
      type: DataTypes.STRING(50), // Plateforme du jeu (ex : PC, PS5…)
      allowNull: true, // Champ optionnel
    },
    genre: {
      type: DataTypes.STRING(50), // Genre du jeu (ex : Action, RPG…)
      allowNull: true, // Champ optionnel
    },
  },
  {
    tableName: 'games', // Nom explicite de la table SQL
    sequelize, // Instance Sequelize                                  // Utilise snake_case en BDD
  }
);
