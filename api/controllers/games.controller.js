export async function getAll(req, res) {
  const games = [
    { title: "Call of Duty: Modern Warfare", image: "cod.jpg", description: "FPS militaire", platform: "PC,PS5" },
    { title: "Forza Horizon 5", image: "forza.jpg", description: "Course automobile", platform: "Xbox,PC" },
    { title: "League of Legends", image: "lol.jpg", description: "MOBA compétitif", platform: "PC" }
  ];
    if (!games || games.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "No games found" });
    }
  return res.json(games);
}

export async function getById(req, res) {
  const game = {
    title: "Call of Duty: Modern Warfare",
    image: "cod.jpg",
    description: "FPS militaire",
    platform: "PC,PS5"
  };
    if (!game) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Game not found" });
    }
  return res.json(game);
}