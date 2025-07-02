// src/lib/server/database/connection.js
import { Sequelize } from 'sequelize';
import { dbConfig } from './config.js';
import { dev } from '$app/environment';

const config = dev ? dbConfig.development : dbConfig.production;

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