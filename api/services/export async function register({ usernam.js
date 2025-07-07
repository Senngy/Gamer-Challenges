export async function register({ username, email, password, birth_date, first_name, last_name }) {
  const res = await fetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, birth_date, first_name, last_name })
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Erreur lors de l'inscription");
  }
  return await res.json();
}x