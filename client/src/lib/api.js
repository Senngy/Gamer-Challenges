// api.js
export default async function api(endpoint, method = "GET", body = null, useAuth = false) {
  const headers = {};

  const isFormData = body instanceof FormData;

  // Ajoute le token uniquement si useAuth est true
  if (useAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    if (isFormData) {
      options.body = body;
      // Ne pas définir 'Content-Type' ici (FormData le gère automatiquement)
    } else {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, options);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      //errorData = { message: response.statusText };
      errorData = { error: response.statusText };
      console.log('errorData 1', errorData.message);
    }
    const errorMsg = errorData.error || errorData.message || `Erreur HTTP ${response.status}`;
    console.error("API Error:", errorMsg);

    throw new Error(errorMsg);
    
  }

  const data = await response.json();
  return data;
}