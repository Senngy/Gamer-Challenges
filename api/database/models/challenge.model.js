import { sequelize } from '../connection.js';              // Import de l'instance Sequelize
import { Model, DataTypes } from 'sequelize';              // Import des classes Sequelize

export class Challenge extends Model {}                    // Déclaration du modèle Challenge

Challenge.init({
  title: {
    type: DataTypes.STRING(100),                           // Titre (max 100 caractères)
    allowNull: false                                       // Champ obligatoire
  },
  description: {
    type: DataTypes.TEXT,                                  // Description longue du challenge
    allowNull: false                                       // Champ obligatoire
  },
  rules: {
    type: DataTypes.TEXT,                                  // Règles spécifiques au challenge
    allowNull: true                                        // Champ optionnel
  },
  challenge_likes: {
    type: DataTypes.INTEGER,                               // Nombre de likes
    defaultValue: 0                                        // Initialisé à 0
  },
  created_by: {
    type: DataTypes.INTEGER,                               // ID de l'utilisateur créateur
    allowNull: false,                                      // Champ obligatoire
    references: {
      model: 'users',                                      // Référence à la table "users"
      key: 'id'                                            // Clé primaire dans "users"
    }
  },
  game_by: {
    type: DataTypes.INTEGER,                               // ID du jeu lié au challenge
    allowNull: false,                                      // Champ obligatoire
    references: {
      model: 'games',                                      // Référence à la table "games"
      key: 'id'                                            // Clé primaire dans "games"
    }
  }
}, {
  tableName: 'challenges',                                 // Nom explicite de la table SQL
  sequelize,                                               // Instance Sequelize utilisée
});