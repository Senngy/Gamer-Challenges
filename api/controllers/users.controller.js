import {
  User,
  sequelize,
  Participation,
  Like,
  Challenge,
} from "../database/models/index.js";
import { Sequelize } from "sequelize";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getAll(req, res) {
  const users = await User.findAll();
  if (!users || users.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "No users found" });
  }
  return res.json(users);
}

export async function getById(req, res) {
  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "pseudo", "email", "avatar"],
  });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
  }
  return res.json(user);
}

export const getTopUsersByChallengeLikes = async (req, res) => {
  try {
    const result = await User.findAll({
      attributes: [
        "id",
        "avatar",
        "pseudo",
        [
          sequelize.literal(`(
            SELECT COALESCE(SUM(challenge_likes), 0)
            FROM challenges
            WHERE created_by = "User".id
          )`),
          "totalChallengeLikes",
        ],
      ],
      order: [[sequelize.literal(`"totalChallengeLikes"`), "DESC"]],
      limit: 10,
      logging: console.log,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur getTopUsersByChallengeLikes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getTopUsersByParticipationLikes = async (req, res) => {
  try {
    const result = await User.findAll({
      subQuery: false,
      attributes: [
        "id",
        "pseudo",
        "avatar",
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn(
              "SUM",
              Sequelize.col("participant.participation_likes")
            ),
            0
          ),
          "totalParticipationLikes",
        ],
      ],
      include: [
        {
          model: Participation,
          as: "participant", // doit correspondre à l’alias défini : User.hasMany(Participation, { as: 'participant', ... })
          attributes: [],
          required: false,
        },
      ],
      group: ["User.id", "User.pseudo"],
      order: [[Sequelize.literal(`"totalParticipationLikes"`), "DESC"]],
      limit: 10,
      logging: console.log,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur getTopUsersByParticipationLikes:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updateAvatar = async (req, res) => {
  const userId = req.params.id;
  console.log("SERVER upload userId: ", userId);
  if (!req.file) {
    return res.status(400).json({ error: "Aucune image reçue" });
  }
  const newAvatarPath = `/uploads/avatars/${req.file.filename}`;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    // Supprimer l'ancien fichier s'il existe
    if (user.avatar) {
      console.log("user.avatar:", user.avatar);
      const oldPath = path.join(__dirname, "..", user.avatar);
      console.log("Old avatar path:", oldPath);

      try {
        await fs.access(oldPath); // vérifie que le fichier existe
        await fs.unlink(oldPath);
        console.log("Old avatar deleted");
      } catch (err) {
        console.error("Error deleting old avatar:", err);
      }
    } else {
      console.log("Old avatar file does not exist");
    }

    // Mise à jour du champ avatar
    user.avatar = newAvatarPath;
    await user.save();

    return res.json({ success: true, avatar: newAvatarPath });
  } catch (error) {
    console.error("Erreur upload avatar:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
