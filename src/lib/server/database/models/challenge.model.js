// src/lib/server/database/models/Challenge.js
import { DataTypes } from 'sequelize';

export default function(sequelize) {
  const Challenge = sequelize.define('Challenge', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rules: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'completed'),
      defaultValue: 'active'
    },
    // Clés étrangères
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'games',
        key: 'id'
      }
    }
  }, {
    tableName: 'challenges',
    timestamps: true,
    underscored: true
  });

  return Challenge;
}