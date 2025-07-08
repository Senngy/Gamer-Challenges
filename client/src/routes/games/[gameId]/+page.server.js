// +page.server.js pour la page détail d'un jeu

export async function load({ fetch, params }) {
  const res = await fetch(`http://localhost:3000/games/${params.gameId}`);

  if (!res.ok) {
    return { game: null };
  }

  const game = await res.json();
  return { game };
}
