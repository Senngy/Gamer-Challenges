export async function load({ fetch, params }) {
  const { gameId } = params;

  if (!gameId || isNaN(+gameId)) {
    // retourne une erreur propre si l'ID est invalide
    throw error(400, 'Paramètre gameId manquant ou invalide');
  }

  const gameRes = await fetch(`http://localhost:3000/games/${gameId}`);
  const challengesRes = await fetch(`http://localhost:3000/challenges/game/${gameId}`);

  if (!gameRes.ok) throw error(gameRes.status, 'Jeu introuvable');

  const game = await gameRes.json();
  const challenges = challengesRes.ok ? await challengesRes.json() : [];

  return { game, challenges };
}
