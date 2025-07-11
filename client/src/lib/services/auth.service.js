// auth.service.js
import api from '../api.js'; // Importe la fonction api pour faire les requêtes HTTP
import { validateLoginData, sanitizeLoginData } from '../verification/validation.form.login.js';

export const login = async (credentials) => {
  try {
    // Validation côté client avant envoi
    const { email, password } = credentials;
    const validation = validateLoginData(email, password);
    
    if (!validation.isValid) {
      // Créer une erreur personnalisée avec les erreurs de validation
      const error = new Error('Données de connexion invalides');
      error.validationErrors = validation.errors;
      throw error;
    }
    
    // Nettoyage des données
    const sanitizedCredentials = sanitizeLoginData(email, password);
    
    const { token, user } = await api('/auth/login', "POST", sanitizedCredentials);
    console.log('Login auth.service.js successful credentials:', sanitizedCredentials);
    console.log('Login auth.service.js successful token:', token);
    console.log('Login auth.service.js successful user:', user);
    return { token, user };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export async function register(pseudo, email, password, birth_date, first_name, last_name) { // Fonction d'inscription
  try {
    const userRegister = await api('/auth/register', "POST", { pseudo, email, password, birth_date, first_name, last_name }, false); // Envoie les données d'inscription à l'API
    console.log('Login auth.service.js successful:', userRegister); // Affiche la réponse de l'API
  } catch (error) {
    console.error('Registration failed:', error); // Affiche l'erreur en cas d’échec
    throw error; // Propage l'erreur
  }
  return userRegister;  // Retourne les données de l'utilisateur enregistré
};

// Fonction pour récupérer les informations de l'utilisateur connecté
export const getCurrentUser = async () => {
  try {
    const user = await api('/auth/me', "GET"); // Appel API pour récupérer les infos utilisateur
    console.log('getCurrentUser user:', user); // Affiche les infos récupérées
    return user; // Retourne l'utilisateur
  } catch (error) {
    console.error('getCurrentUser failed:', error); // Affiche l'erreur
    throw error; // Propage l'erreur
  } 
};

// Fonction pour récupérer les informations modifiées par l'utilisateur (pseudo)
export async function updatePseudo(newPseudo) {
  try {
    const response = await api('/auth/me/pseudo', "PATCH", {newPseudo}); // Envoie le nouveau pseudo à l'API
    console.log('Update pseudo auth.service.js successful:', response); // Affiche la réponse
    return; // Pas de retour spécifique
  } catch (error) {
    console.error('Update pseudo failed:', error); // Affiche l'erreur
    throw error; // Propage l'erreur
  }
};

// Fonction pour récupérer les informations modifiées par l'utilisateur (mot de passe)
export async function updatePassword(currentPassword, newPassword) {
  try {
    const response = await api('/auth/me/password', "PATCH", { currentPassword, newPassword }); // Envoie ancien et nouveau mot de passe à l'API
    console.log('Update password auth.service.js successful:', response); // Affiche la réponse
    return; // Pas de retour spécifique
  } catch (error) {
    console.error('Update password auth.service.js failed:', error); // Affiche l'erreur
    throw error; // Propage l'erreur
  }
};

// Fonction pour déconnecter l'utilisateur
export const logout = async () => {
  try {
    const token = localStorage.getItem('token'); // Récupère le token stocké localement
    
    if (token) {
      // Appel à l'API de déconnexion
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, { // Envoie la requête de logout à l’API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    }
    console.log('Déconnexion API réussie'); // Affiche succès
  } catch (error) {
    console.error('Erreur lors de l\'appel API de déconnexion:', error); // Affiche l’erreur de logout
    // On continue même si l'API échoue, car on veut nettoyer le localStorage
  }
};

// Fonction pour supprimer le compte utilisateur
export const deleteAccount = async () => {
  try {
    const { token } = await api('/auth/me', "DELETE"); // Envoie la requête DELETE à l'API pour supprimer le compte
    console.log('Delete auth.service.js successful token:', token); // Affiche la réponse de suppression

    return; // Fin de la fonction
  } catch (error) {
    console.error('Delete Account failed:', error); // Affiche l'erreur
    throw error; // Propage l'erreur
  }
};