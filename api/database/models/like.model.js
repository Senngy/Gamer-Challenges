// api/database/models/like.model.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

export class Like extends Model {}

Like.init(
  {
    target_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['challenge', 'participation']]
      }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    target_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  },
  {
    tableName: 'likes',
    sequelize,
    // Contrainte unique : un user ne peut liker qu'une fois un objet
    indexes: [
      {
        name: 'unique_like',
        unique: true,
        fields: ['user_id', 'target_id', 'target_type']
      }
    ]
  }
);
