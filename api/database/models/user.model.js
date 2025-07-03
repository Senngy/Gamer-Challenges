// src/lib/server/database/models/User.js
import { sequelize } from '../connection.js';
import { Model, DataTypes } from 'sequelize';

// Définition du modèle "User"
export class User extends Model {}

User.init({
  pseudo: {
    type: DataTypes.STRING(50),      // Chaîne de 50 caractères max
    unique: true,                    // Doit être unique
    allowNull: false,                // Obligatoire
  },
  email: {
    type: DataTypes.STRING(320),     // Chaîne max 320 caractères
    unique: true,                    // Email unique
    allowNull: false,                // Obligatoire
    validate: {
      isEmail: true,                 // Vérifie le format email
    },
  },
  password: {
    type: DataTypes.STRING(255),     // Mot de passe hashé
    allowNull: false,                // Obligatoire
  },
  last_name: {
    type: DataTypes.STRING(50),      // Nom (optionnel)
    allowNull: true,
  },
  first_name: {
    type: DataTypes.STRING(50),      // Prénom (optionnel)
    allowNull: true,
  },
  birth_date: {
    type: DataTypes.DATEONLY,        // Date sans heure (YYYY-MM-DD)
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING(255),     // URL ou nom de fichier de l'avatar
    allowNull: true,
  },
}, {
  tableName: 'users',                // Nom explicite de la table SQL
  sequelize,                         // Instance de Sequelize
  timestamps: true,                  // Active createdAt / updatedAt
  underscored: true,                 // Utilise snake_case (ex : created_at)
});