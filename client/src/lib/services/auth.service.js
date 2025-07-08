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

/*
export const loginUser = async (credentials) => {
  const { token } = await api("/auth/login", "POST", credentials);
  const user = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
  return { token, user };

  // return { token };
};
*/