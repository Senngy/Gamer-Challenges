// auth.service.js
import api from '../api.js';


export const login = async (credentials) => {
  try {
    const { token, user } = await api('/auth/login', "POST", credentials);
    console.log(' Login auth.service.js successful credientials:', credentials);
    console.log('Login auth.service.js successful token:', token);
    /*
    const user = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, { // Récupération des infos de l'utilisateur connecté
      method: "GET",
      headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json()); 
  *///
    console.log('Login auth.service.js successful user:', user);
  return { token, user };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export async function register(pseudo, email, password, birth_date, first_name, last_name) {
  try {
    const userRegister = await api('/auth/register', "POST", { pseudo, email, password, birth_date, first_name, last_name }, false);
    console.log('Login auth.service.js successful:', userRegister);
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
  return userRegister; 
};

// Fonction pour récupérer les informations de l'utilisateur connecté
export const getCurrentUser = async () => {
  try {
    const user = await api('/auth/me', "GET");
    console.log('getCurrentUser user:', user);
    return user;
  } catch (error) {
    console.error('getCurrentUser failed:', error);
    throw error;
  } 
};

// Fonction pour récupérer les informations modifié par l'utilisateur (pseudo)
export async function updatePseudo(newPseudo) {
  try {
    const response = await api('/auth/me/pseudo', "PATCH", {newPseudo});
    console.log('Update pseudo auth.service.js successful:', response);
    return
  } catch (error) {
    console.error('Update pseudo failed:', error);
    throw error;
  }
 
};

// Fonction pour récupérer les informations modifié par l'utilisateur (mot de passe)
export async function updatePassword(currentPassword, newPassword) {
  try {
    const response = await api('/auth/me/password', "PATCH", { currentPassword, newPassword });
    console.log('Update password auth.service.js successful:', response);
    return
  } catch (error) {
    console.error('Update password auth.service.js failed:', error);
    throw error;
  }
};

// Fonction pour déconnecter l'utilisateur
export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Appel à l'API de déconnexion
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    }
    console.log('Déconnexion API réussie');
  } catch (error) {
    console.error('Erreur lors de l\'appel API de déconnexion:', error);
    // On continue même si l'API échoue, car on veut nettoyer le localStorage
  }
};

// Fonction pour supprimer le compte utilisateur
export const deleteAccount = async () => {
  try {
    const { token } = await api('/auth/me', "DELETE");
    console.log('Delete auth.service.js successful token:', token);
    // const deleteAccountUser = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, { // Suppression des infos de l'utilisateur
    //   method: "DELETE",
    //   headers: {
    //   Authorization: `Bearer ${token}`,
    // },
    return;
  } catch (error) {
    console.error('Delete Account failed:', error);
    throw error;
  }
};
