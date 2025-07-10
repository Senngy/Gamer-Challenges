// api.js
export default async function api(endpoint, method = "GET", body) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ pour envoyer les cookies (si backend en utilise)
  };

  if (body) {
    options.body = JSON.stringify(body); // ✅ uniquement si body est défini
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, options);
 // console.log(`API call to ${endpoint} with method ${method} and body:`, body);
 // console.log("token :", localStorage.getItem("token"));  

  // ✅ En cas de code >=400, on parse le JSON d’erreur
  if (!response.ok) {
    let errData;
    try {
      errData = await response.json();
    } catch {
      // fallback si ce n'est pas du JSON
      errData = { message: response.statusText };
    }
    console.error(`Erreur HTTP ${response.status} :`, errData);
    // → on lance l’erreur avec le message du serveur
    throw new Error(errData.message || response.statusText);
  }

  const data = await response.json();
  return data;
}