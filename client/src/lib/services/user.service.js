// user.service.js
import api from '../api.js';

export async function getUserById(userId) {
  try {
    const user = await api(`/users/${userId}`, "GET");
    console.log('getUserById successful:', user);
    return user;
  } catch (error) {
    console.error('getUserById failed:', error);
    throw error;
  }
}