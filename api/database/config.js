// src/lib/server/database/config.js
import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
  development: {
    username: process.env.DB_USER || 'gamer_challenges',
    password: process.env.DB_PASSWORD || 'gamerchallenges',
    database: process.env.DB_NAME || 'gamer_challenges_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: console.log, // Logs SQL en dev
    define: {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', // 🛑 tu avais 'mysql', je suppose que tu veux rester en postgres ?
    logging: false,
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000
    }
  }
};