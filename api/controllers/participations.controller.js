import { Participation } from '../database/models/participation.model.js';

export async function addParticipation(req, res) {
  const { media_link, description, challenge_id, user_id } = req.body;

  // Validation simple
  if (!media_link || !description || !challenge_id || !user_id) {
    return res.status(400).json({ success: false, message: 'Champs manquants' });
  }
  try {
    // Vérification si l'utilisateur a déjà participé à ce challenge
    const existingParticipation = await Participation.findOne({
      where: {
        challenge_id,
        user_id
      }
    });
    if (existingParticipation) {
      return res.status(400).json({
        success: false,
        message: "Vous avez déjà participé à ce challenge."
      });
    }
    // Création de la participation
    const participation = await Participation.create({
        media_link,
        description,
        challenge_id,
        user_id
    });

    res.status(201).json({
      success: true,
      message: 'Participation créée avec succès',
      participation
    });
  } catch (error) {
    console.error('Erreur lors de la création de la participation :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur lors de la création de la participation.' });
  };
}

export const getLikes = async (req, res) => {
  const target_id = parseInt(req.params.id, 10);
  const target_type = "participation";

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
    return res.status(400).json({ error: "ID de participation invalide." });
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

//

export const addLike = async (req, res) => {
  const participationId = parseInt(req.params.id, 10);
  console.log(`Participation ID: ${participationId}`); // Doit afficher l'ID de la participation
  const userId = req.user_id;
  console.log(`User ID: ${userId}`); // Doit afficher l'ID de l'utilisateur

  const target_type = "participation"; // On sait que c’est une participation via l’URL
  const target_id = participationId;

  if (!userId || isNaN(participationId)) {
    return res.status(400).json({ error: "Paramètres requis manquants." });
  }

  try {
    // Vérifie que la participation existe
    const participation = await Participation.findByPk(participationId);
    if (!participation) {
      return res.status(404).json({ error: "Participation introuvable." });
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
      return res.status(400).json({ message: "Vous avez déjà liké ce contenu." });
    }
    
    // Incrémente le compteur de likes si nouveau
    await Participation.increment('likes', {
      where: { id: participationId }
    });

    return res.status(201).json({ message: "Like ajouté avec succès." });
  } catch (err) {
    console.error("Erreur lors de l’ajout du like :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};

export const deleteLike = async (req, res) => {
  const participationId = parseInt(req.params.id, 10);
  console.log(`Participation ID: ${participationId}`); // Doit afficher l'ID de la participation
  const userId = req.user_id;
  console.log(`User ID: ${userId}`); // Doit afficher l'ID de l'utilisateur

  const target_type = "participation"; // On sait que c’est une participation via l’URL
  const target_id = participationId;

  if (!userId || isNaN(participationId)) {
    return res.status(400).json({ error: "Paramètres requis manquants." });
  }

  try {
    // Vérifie que la participation existe
    const participation = await Participation.findByPk(participationId);
    if (!participation) {
      return res.status(404).json({ error: "Participation introuvable." });
    }

    // Supprime le like
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
    // Supprime le like pour le participation
        await Participation.decrement("participation_likes", {
          where: { id: participationId },
        });
    

    return res.status(200).json({ message: "Like enlevé avec succès." });
  } catch (err) {
    console.error("Erreur lors de la suppression du like :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};

export const checkIfLiked = async (req, res) => {
  const userId = req.user_id;
  const participationId = parseInt(req.params.id, 10);
  console.log(`Participation ID: ${participationId}`); // Doit afficher l'ID de la participation
  console.log(`User ID: ${userId}`); // Doit afficher l'ID de l'utilisateur

  if (!userId || isNaN(participationId)) {
    return res.status(400).json({ error: 'Paramètres invalides.' });
  }

  try {
    const hasLiked = await Like.findOne({
      where: {
        user_id: userId,
        target_type: 'participation',
        target_id: participationId
      }
    });

    return res.status(200).json({ hasLiked: !!hasLiked });
  } catch (err) {
    console.error('Erreur dans checkIfLiked:', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
};

export const addLikeToParticipation = async (req, res) => {
  const participationId = parseInt(req.params.id, 10);
  console.log(`Participation ID: ${participationId}`); // Doit afficher l'ID de la participation
  
   if (isNaN(participationId)) {
    return res.status(400).json({ error: 'Paramètres invalides.' });
  }
  try {
    const hasLiked = await Like.findOne({
      where: {
        user_id: userId,
        target_type: 'participation',
        target_id: participationId
      }
    });

    return res.status(200).json({ hasLiked: !!hasLiked });
  } catch (err) {
    console.error('Erreur dans checkIfLiked:', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
