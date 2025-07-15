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
  // Récupère le token JWT stocké dans le localStorage du navigateur
  const token = localStorage.getItem("token");

  // Récupère les données de l'utilisateur (au format JSON string) puis les parse
  const user = JSON.parse(localStorage.getItem("user"));

  // Si un token ET un user sont présents en localStorage
  if (token && user) {
    // Décode le token pour en extraire les données utiles (comme exp)
    const decoded = decodeJwt(token);

    // Récupère la date actuelle (en secondes UNIX, pour comparaison avec `exp`)
    const now = Math.floor(Date.now() / 1000);

    // Si le token est bien formé et pas encore expiré
    if (decoded?.exp && decoded.exp > now) {
      // On restaure les valeurs dans le store si tout est valide
      authStore.user = user;
      authStore.token = token;
    } else {
      // Si le token est expiré, on vide le store + localStorage
      clearAuth(); // 🔐 Sécurité : éviter une session obsolète
    }
  } else {
    // Si aucune info en localStorage → on s'assure de tout nettoyer
    clearAuth();
  }
};

function decodeJwt(token) {
  try {
    // Découpe le token en 3 parties : header.payload.signature
    // Ici on récupère uniquement la partie `payload` (base64)
    const payload = token.split('.')[1];

    // Décode le payload en base64 (le transforme en chaîne lisible)
    const decoded = atob(payload);

    // Convertit le JSON string décodé en objet JavaScript
    return JSON.parse(decoded);
  } catch (err) {
    // En cas d'erreur (ex: token mal formé), on affiche l'erreur et retourne null
    console.error('Token invalide:', err);
    return null;
  }
}

export const isAuthenticated = () => {
  // Récupère le token actuel depuis le store (authStore)
  const token = authStore.token;

  // Si aucun token n'est présent, l'utilisateur n'est pas authentifié
  if (!token) return false;

  // Décode le token pour accéder à ses infos (dont la date d'expiration)
  const decoded = decodeJwt(token);

  // Si le token est mal formé ou n'a pas de champ `exp`, on le considère invalide
  if (!decoded || !decoded.exp) return false;

  // Récupère l'heure actuelle en secondes depuis Epoch
  const now = Math.floor(Date.now() / 1000);

  // Compare la date d'expiration (`exp`) du token avec la date actuelle
  // Retourne `true` si le token est encore valide (pas expiré), sinon `false`
  return decoded.exp > now;
};
/*
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
*/