import { DataTypes } from 'sequelize';

export default function(sequelize) {
  const Participation = sequelize.define('Participation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    videoUrl: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // Clés étrangères
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    challengeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'challenges',
        key: 'id'
      }
    }
  }, {
    tableName: 'participations',
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

  return Participation;
}