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
import supabase from "../server/supabaseClient.js";

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
  let newAvatarUrl;
  const newAvatarPath = `/uploads/avatars/${req.file.filename}`;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    if (process.env.NODE_ENV === "production") {
      // ---------------- PROD (Supabase) ----------------
      const uniqueName = `avatars/${Date.now()}-${req.file.originalname}`;

      const { data, error } = await supabase.storage
        .from("gc-uploads")
        .upload(uniqueName, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (error) throw error;

      newAvatarUrl = supabase.storage
        .from("gc-uploads")
        .getPublicUrl(uniqueName).data.publicUrl;
    } else {
      // ---------------- DEV (local) ----------------
      newAvatarUrl = `${req.protocol}://${req.get("host")}${newAvatarPath}`;

      // Supprimer l'ancien fichier s'il existe
      if (user.avatar) {
        console.log("user.avatar:", user.avatar);
        const oldPath = path.join(__dirname, "..", user.avatar);
        console.log("Ancien chemin de l'avatar:", oldPath);

        try {
          await fs.access(oldPath); // vérifie que le fichier existe
          await fs.unlink(oldPath);
          console.log("Ancien avatar supprimé:", oldPath);
        } catch (err) {
          console.error("Erreur lors de la suppression de l'ancien avatar:", err);
        }
      } else {
        console.log("Ancien avatar inexistant");
      }
    }

    // Mise à jour du champ avatar
    user.avatar = newAvatarUrl;
    await user.save();

    return res.json({ success: true, avatar: newAvatarUrl});
  } catch (error) {
    console.error("Erreur upload avatar:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
