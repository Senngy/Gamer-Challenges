export const authStore = $state({ user: null, token: null });

export const setAuth = (user, token) => {
  authStore.user = user;
  authStore.token = token;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const clearAuth = () => {
  authStore.user = null;
  authStore.token = null;

  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getAuth = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  if (token && user) {
    authStore.user = user;
    authStore.token = token;
  } else {
    authStore.user = null;
    authStore.token = null;
  }
};

export const isAuthenticated = () => {
  return authStore.token;
};
