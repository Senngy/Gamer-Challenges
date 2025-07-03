import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

export class Participation extends Model {}

Participation.init({
    media_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // Clés étrangères
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    challenge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'challenges',
        key: 'id'
      }
    }
  }, {
    tableName: 'participations',
    sequelize, // Instance de Sequelize
    timestamps: true,
    underscored: true,
    // Contrainte unique : un user ne peut participer qu'une fois par défi
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'challenge_id']
      }
    ]
  });
