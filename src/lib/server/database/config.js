// src/lib/server/database/config.js
import { env } from '$env/dynamic/private';

export const dbConfig = {
  development: {
    username: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'gamer_challenges_dev',
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || 3306,
    dialect: 'mysql', // ou 'postgres', 'sqlite'
    logging: console.log, // Logs SQL en dev
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: 'mysql',
    logging: false, // Pas de logs en prod
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000
    }
  }
};