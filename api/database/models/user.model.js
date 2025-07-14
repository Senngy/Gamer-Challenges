import { sequelize } from '../connection.js';
import { Model, DataTypes } from 'sequelize';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale'; // pour le format français


export class User extends Model { } 

// Déclaration du modèle User
// Le modèle "User" représente les utilisateurs de l'application
// Il contient des informations telles que le pseudo, l'email, le mot de passe,
User.init(
  {
    pseudo: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(320),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    birth_date: {
    type: DataTypes.DATEONLY, // stocke uniquement la date
    allowNull: true,
    get() {
    const rawValue = this.getDataValue('birth_date');
    return rawValue ? format(new Date(rawValue), 'dd/MM/yyyy', { locale: fr }) : null;
      }
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: true,
    underscored: true,
  }
);