// api.js
export default async function api(endpoint, method = "GET", body) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });
  console.log(`API call to ${endpoint} with method ${method} and body:`, body);
  console.log("token :", localStorage.getItem("token"));  

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}