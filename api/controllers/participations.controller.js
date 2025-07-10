import { Participation } from '../database/models/participation.model.js';

export async function addParticipation(req, res) {
  const { media_link, description, challenge_id, user_id } = req.body;

  // Validation simple
  if (!media_link || !description || !challenge_id || !user_id) {
    return res.status(400).json({ success: false, message: 'Champs manquants' });
  }

  try {
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