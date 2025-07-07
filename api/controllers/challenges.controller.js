export async function getAll(req, res) {
  const challenges = [
        { title: "Tuer 10 ennemis en 3 minutes", description: "Défi rapidité multijoueur", rules: "Pas de grenades, pas de véhicules", game_by: 1, created_by: 1 },
        { title: "Gagner une course en difficulté max", description: "Conduite extrême", rules: "Pas de rewind, IA max", game_by: 2, created_by: 2 },
        { title: "Faire un pentakill en ranked", description: "Objectif ultime", rules: "En partie classée uniquement", game_by: 3, created_by: 3 }
    ];
    if (!challenges || challenges.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "No challenges found" });
    }
  return res.json(challenges);
}

export async function getById(req, res) {
  const challenge = {
    title: "Call of Duty: Modern Warfare",
    image: "cod.jpg",
    description: "FPS militaire",
    platform: "PC,PS5"
  };
    if (!challenge) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Challenge not found" });
    }
  return res.json(challenge);
}