import jwt from "jsonwebtoken";
import { Challenge } from "../database/models/challenge.model.js"; // Import du modèle Challenge
import { Participation } from "../database/models/participation.model.js"; // Import du modèle Participation
import { StatusCodes } from "http-status-codes"; // Import des codes de statut HTTP
import { Game, User, Like } from "../database/models/index.js"; // Import des modèles Game et User

export async function getAll(req, res) {
  // Récupérer tous les challenges
  try {
    const challenges = await Challenge.findAll(); // Récupération de tous les challenges

    if (!challenges || challenges.length === 0) {
      // Vérification si des challenges existent
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No challenges found" }); // Aucun challenge trouvé
    }

    return res.status(StatusCodes.OK).json(challenges); // Retour des challenges
  } catch (error) {
    console.error("Error fetching challenges:", error); // Log de l'erreur
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" }); // Erreur serveur
  }
}

export async function getById(req, res) {
  // Récupérer un challenge par son ID
  try {
    const challenge = await Challenge.findByPk(req.params.id); // Recherche du challenge par ID

    if (!challenge) {
      // Vérification si le challenge existe
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Challenge not found" }); // Challenge non trouvé
    }

    return res.status(StatusCodes.OK).json(challenge); // Retour du challenge
  } catch (error) {
    console.error("Error fetching challenge:", error); // Log de l'erreur
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" }); // Erreur serveur
  }
}

export async function getChallengeParticipations(req, res) {
  // Récupérer les participations d'un challenge
  try {
    const challengeId = req.params.id; // Récupération de l'ID du challenge

    const challenge = await Challenge.findByPk(challengeId, {
      // Recherche du challenge avec ses participations
      include: {
        model: Participation,
        as: "participations",
        include: { model: User, as: "user", attributes: ["id", "pseudo"] }, // Inclusion des informations utilisateur
      },
    });

    if (!challenge) {
      // Vérification si le challenge existe
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Challenge not found" }); // Challenge non trouvé
    }

    return res.status(StatusCodes.OK).json(challenge.participations); // Retour des participations
  } catch (error) {
    console.error("Error fetching challenge participations:", error); // Log de l'erreur
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" }); // Erreur serveur
  }
}

export async function create(req, res) {
  // Créer un nouveau challenge
  try {
    const { title, description, rules, game_by, created_by } = req.body; // Récupération des données de la requête

    if (!title || !description || !rules || !game_by || !created_by) {
      // Validation des champs obligatoires
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Champs manquants" }); // Champs manquants
    }

    const gameExists = await Game.findByPk(game_by); // Vérification de l'existence du jeu
    if (!gameExists) {
      // Si le jeu n'existe pas
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `Jeu avec ID ${game_by} introuvable.` }); // Jeu non trouvé
    }

    const userExists = await User.findByPk(created_by); // Vérification de l'existence de l'utilisateur
    if (!userExists) {
      // Si l'utilisateur n'existe pas
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `Utilisateur avec ID ${created_by} introuvable.` }); // Utilisateur non trouvé
    }

    const newChallenge = await Challenge.create({
      title,
      description,
      rules,
      game_by,
      created_by,
    }); // Création du nouveau challenge

    return res.status(StatusCodes.CREATED).json(newChallenge); // Retour du challenge créé
  } catch (error) {
    console.error("Erreur lors de la création du challenge :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la création du challenge.",
    });
  }
}

export async function getParticipations(req, res) {
  const challengeId = Number(req.params.id);

  if (!challengeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid challenge ID" });
  }

  try {
    const participations = await Participation.findAll({
      where: { challenge_id: challengeId },
      include: [
        { model: User, as: "user", attributes: ["id", "pseudo", "avatar"] },
      ],
      order: [["created_at", "DESC"]],
    });

    return res.status(StatusCodes.OK).json(participations);
  } catch (err) {
    console.error("Erreur lors du fetch des participations :", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erreur serveur" });
  }
}

//
export const getLikes = async (req, res) => {
  const target_id = parseInt(req.params.id, 10);
  const target_type = "challenge";

  if (isNaN(target_id)) {
    return res.status(400).json({ error: "ID de challenge invalide." });
  }

  try {
    const totalLikes = await Like.count({ where: { target_id, target_type } });
    return res.json({ likes: totalLikes });
  } catch (err) {
    console.error("Erreur getLikes :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};
/*
export const getLikes = async (req, res) => {
  const target_id = parseInt(req.params.id, 10);
  const target_type = "challenge";

  let user_id = null;

  // ✅ Décodage manuel du token s'il existe
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      user_id = payload.user_id;
    } catch (err) {
      console.warn("Token invalide ou expiré");
    }
  }

  if (isNaN(target_id)) {
    return res.status(400).json({ error: "ID de challenge invalide." });
  }

  try {
    const totalLikes = await Like.count({ where: { target_id, target_type } });

    let liked = false;
    if (user_id) {
      const like = await Like.findOne({
        where: { target_id, target_type, user_id },
      });
      liked = !!like;
    }

    return res.json({
      likes: totalLikes,
      liked,
    });
  } catch (err) {
    console.error("Erreur getLikes :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};
*/

//

export const addLike = async (req, res) => {
  const challengeId = parseInt(req.params.id, 10);
  console.log(`Challenge ID: ${challengeId}`); // Doit afficher l'ID du challenge
  const userId = req.user_id;
  console.log(`User ID: ${userId}`); // Doit afficher l'ID du challenge

  const target_type = "challenge"; // On sait que c’est un challenge via l’URL
  const target_id = challengeId;

  if (!userId || isNaN(challengeId)) {
    return res.status(400).json({ error: "Paramètres requis manquants." });
  }

  try {
    // Vérifie que le challenge existe
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge introuvable." });
    }

    // Vérifie et ajoute le like
    const [like, created] = await Like.findOrCreate({
      where: {
        user_id: userId,
        target_id,
        target_type,
      },
    });

    if (!created) {
      return res
        .status(400)
        .json({ message: "Vous avez déjà liké ce contenu." });
    }

    // Incrémente le compteur de likes si nouveau pour la table challenges
    await Challenge.increment("challenge_likes", {
      where: { id: challengeId },
    });

    return res.status(201).json({ message: "Like ajouté avec succès." });
  } catch (err) {
    console.error("Erreur lors de l’ajout du like :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};

export const deleteLike = async (req, res) => {
  const challengeId = parseInt(req.params.id, 10);
  console.log(`Challenge ID: ${challengeId}`); // Doit afficher l'ID du challenge
  const userId = req.user_id;
  console.log(`User ID: ${userId}`); // Doit afficher l'ID de l'user qui a liké le challenge

  const target_type = "challenge"; // On sait que c’est un challenge via l’URL
  const target_id = challengeId;

  if (!userId || isNaN(challengeId)) {
    return res.status(400).json({ error: "Paramètres requis manquants." });
  }

  try {
    // Vérifie que le challenge existe
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge introuvable." });
    }

    // Vérifie l'existance du like et le supprime
    const deleted = await Like.destroy({
      where: {
        user_id: userId,
        target_id: target_id,
        target_type: target_type,
      },
    });
    if (deleted === 0) {
      return res.status(404).json({ error: "Like non trouvé." });
    }
    // Supprime le like pour le challenge
    await Challenge.decrement("challenge_likes", {
      where: { id: challengeId },
    });

    return res.status(200).json({ message: "Like enlevé avec succès." });
  } catch (err) {
    console.error("Erreur lors de la suppression du like :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};

export const checkIfLiked = async (req, res) => {
  const userId = req.user_id;
  const challengeId = parseInt(req.params.id, 10);
  console.log(`Challenge ID: ${challengeId}`); // Doit afficher l'ID du challenge
  console.log(`User ID: ${userId}`); // Doit afficher l'ID de l'user qui a liké le challenge

  if (!userId || isNaN(challengeId)) {
    return res.status(400).json({ error: "Paramètres invalides." });
  }

  try {
    const liked = await Like.findOne({
      where: {
        user_id: userId,
        target_type: "challenge",
        target_id: challengeId,
      },
    });

    return res.status(200).json({ hasLiked: !!liked });
  } catch (err) {
    console.error("Erreur dans checkIfLiked:", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};
