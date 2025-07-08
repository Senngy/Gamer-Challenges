// auth.service.js
import api from '../api.js';


export const login = async (credentials) => {
  try {
    const { token } = await api('/auth/login', "POST", credentials);
    console.log(' Login auth.service.js successful credientials:', credentials);
    console.log('Login auth.service.js successful token:', token);
    const user = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, { // Récupération des infos de l'utilisateur connecté
      method: "GET",
      headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json()); //
    console.log('Login auth.service.js successful user:', user);
  return { token, user };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export async function register(pseudo, email, password, birth_date, first_name, last_name) {
  try {
    const userRegister = await api('/auth/register', "POST", { pseudo, email, password, birth_date, first_name, last_name });
    console.log('Login auth.service.js successful:', userRegister);
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
  return userRegister; 
}

// Fonction pour récupérer les informations de l'utilisateur connecté
export const getCurrentUser = async () => {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // ou ton système de stockage
    },
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Échec de récupération de l’utilisateur');
   console.log('getCurrentUser res:', res);
   
   const user = await res.json();
   console.log('getCurrentUser user:', user);
  return await user;
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



