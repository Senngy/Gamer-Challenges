import { Challenge } from '../database/models/challenge.model.js'; // Import du modèle Challenge
import { Participation } from '../database/models/participation.model.js'; // Import du modèle Participation
import { StatusCodes } from 'http-status-codes'; // Import des codes de statut HTTP
import { Game, User } from '../database/models/index.js'; // Import des modèles Game et User

export async function getAll(req, res) { // Récupérer tous les challenges
  try {
    const challenges = await Challenge.findAll(); // Récupération de tous les challenges

    if (!challenges || challenges.length === 0) { // Vérification si des challenges existent
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'No challenges found' }); // Aucun challenge trouvé
    }

    return res.status(StatusCodes.OK).json(challenges); // Retour des challenges
  } catch (error) {
    console.error('Error fetching challenges:', error); // Log de l'erreur
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' }); // Erreur serveur
  }
}

export async function getById(req, res) { // Récupérer un challenge par son ID
  try {
    const challenge = await Challenge.findByPk(req.params.id); // Recherche du challenge par ID

    if (!challenge) { // Vérification si le challenge existe
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Challenge not found' }); // Challenge non trouvé
    }

    return res.status(StatusCodes.OK).json(challenge); // Retour du challenge
  } catch (error) {
    console.error('Error fetching challenge:', error); // Log de l'erreur
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' }); // Erreur serveur
  }
}

export async function getChallengeParticipations(req, res) { // Récupérer les participations d'un challenge
  try {
    const challengeId = req.params.id; // Récupération de l'ID du challenge
    
    const challenge = await Challenge.findByPk(challengeId, { // Recherche du challenge avec ses participations
      include: { 
        model: Participation, 
        as: "participations",
        include: { model: User, as: "user", attributes: ['id', 'pseudo'] } // Inclusion des informations utilisateur
      }
    });

    if (!challenge) { // Vérification si le challenge existe
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Challenge not found' }); // Challenge non trouvé
    }

    return res.status(StatusCodes.OK).json(challenge.participations); // Retour des participations
  } catch (error) {
    console.error('Error fetching challenge participations:', error); // Log de l'erreur
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' }); // Erreur serveur
  }
}

export async function create(req, res) { // Créer un nouveau challenge
  try {
    const { title, description, rules, game_by, created_by } = req.body; // Récupération des données de la requête

    if (!title || !description || !rules || !game_by || !created_by) { // Validation des champs obligatoires
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Champs manquants' }); // Champs manquants
    }

    const gameExists = await Game.findByPk(game_by); // Vérification de l'existence du jeu
    if (!gameExists) { // Si le jeu n'existe pas
      return res.status(StatusCodes.BAD_REQUEST).json({ error: `Jeu avec ID ${game_by} introuvable.` }); // Jeu non trouvé
    }

    const userExists = await User.findByPk(created_by); // Vérification de l'existence de l'utilisateur
    if (!userExists) { // Si l'utilisateur n'existe pas
      return res.status(StatusCodes.BAD_REQUEST).json({ error: `Utilisateur avec ID ${created_by} introuvable.` }); // Utilisateur non trouvé
    }

    const newChallenge = await Challenge.create({ // Création du nouveau challenge
      title,
      description,
      rules,
      game_by,
      created_by,
    });

    return res.status(StatusCodes.CREATED).json(newChallenge); // Retour du challenge créé
  } catch (error) {
    console.error('Erreur lors de la création du challenge :', error); // Log de l'erreur
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erreur serveur lors de la création du challenge.' }); // Erreur serveur
  }
}