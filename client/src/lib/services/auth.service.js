// auth.service.js
import api from '../api.js'; // Importe la fonction api pour faire les requêtes HTTP
import { validateLoginData, sanitizeLoginData } from '../utils/validation.form.login.js';
import { authStore } from '$lib/store/authStore.svelte.js';

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
    //console.error('Service Login échoué:', error);
    throw error;
  }
};

export async function register(pseudo, email, password, birth_date, first_name, last_name) { // Fonction d'inscription
  try {
    // Convertir la date de YYYY-MM-DD vers dd/MM/yyyy
    const formatDateForAPI = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    const formattedBirthDate = formatDateForAPI(birth_date);
    const userRegister = await api('/auth/register', "POST", { pseudo, email, password, birth_date: formattedBirthDate, first_name, last_name }, false); // Envoie les données d'inscription à l'API
    console.log('Login auth.service.js successful:', userRegister); // Affiche la réponse de l'API
    return userRegister;  // Retourne les données de l'utilisateur enregistré
  } catch (error) {
    console.error('Registration failed:', error); // Affiche l'erreur en cas d’échec
    throw error; // Propage l'erreur
  }
  
};

// Fonction pour récupérer les informations de l'utilisateur connecté
export const getCurrentUser = async () => {
  console.log('getCurrentUser')
  console.log("SERVICE getCurrentUser authstore.token",authStore.token)
  try {
    const user = await api('/auth/me', "GET", null, true); // Appel API pour récupérer les infos utilisateur
    //console.log('getCurrentUser user:', user); // Affiche les infos récupérées
    return user; // Retourne l'utilisateur
  } catch (error) {
    console.error('getCurrentUser failed:', error); // Affiche l'erreur
    throw error; // Propage l'erreur
  } 
};

// Fonction pour récupérer les informations modifiées par l'utilisateur (pseudo)
export async function updatePseudo(newPseudo) {
  try {
    const response = await api('/auth/me/pseudo', "PATCH", {newPseudo}, true); // Envoie le nouveau pseudo à l'API
   // console.log('Update pseudo auth.service.js successful:', response); // Affiche la réponse
    return; // Pas de retour spécifique
  } catch (error) {
    console.error('Update pseudo failed:', error); // Affiche l'erreur
    throw error; // Propage l'erreur
  }
};

// Fonction pour récupérer les informations modifiées par l'utilisateur (mot de passe)
export async function updatePassword(currentPassword, newPassword) {
  try {
    const response = await api('/auth/me/password', "PATCH", { currentPassword, newPassword }, true); // Envoie ancien et nouveau mot de passe à l'API
   // console.log('Update password auth.service.js successful:', response); // Affiche la réponse
    return; // Pas de retour spécifique
  } catch (error) {
    console.error('Update password auth.service.js failed:', error); // Affiche l'erreur
    throw error; // Propage l'erreur
  }
};

// Fonction pour déconnecter l'utilisateur
export const logout = async () => {
  try {
    const response = await api('/auth/logout', 'POST', null, true);
    // Si on arrive ici, c’est que la requête a été OK (200)
    return { success: true, message: 'Déconnexion réussie côté API' };
  } catch (error) {
    console.error('Erreur côté API pour la déconnexion:', error); // Affiche l’erreur de logout
    // On renvoie un objet pour cleanLogout
     return { success: false, message: error.message || 'Erreur lors de la déconnexion' };
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