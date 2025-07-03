// src/lib/server/database/connection.js
import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { dbConfig } from './config.js';
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

const config = process.env.NODE_ENV === 'development' ? dbConfig.development : dbConfig.production;

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Test de connexion
export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}