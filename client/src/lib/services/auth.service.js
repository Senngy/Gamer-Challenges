// auth.service.js
import api from '../api.js';


export const login = async (email, password) => {
  try {
    const user = await api('/auth/login', "POST", { email, password });
    console.log('Login auth.service.js successful:', user);
    return user;
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