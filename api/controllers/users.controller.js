import { User, sequelize, Participation, Like, Challenge } from "../database/models/index.js";
import { Sequelize } from 'sequelize';

export async function getAll(req, res) {
  const users = [
    { pseudo: "Jules95", email: "jules@example.com", password: "hashedpass1" },
    { pseudo: "LaraCroft", email: "lara@example.com", password: "hashedpass2" },
    { pseudo: "AlexDev", email: "alex@example.com", password: "hashedpass3" },
  ];
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
        'id',
        'pseudo',
        [
          sequelize.literal(`(
            SELECT COALESCE(SUM(challenge_likes), 0)
            FROM challenges
            WHERE created_by = "User".id
          )`),
          'totalChallengeLikes'
        ]
      ],
      order: [[sequelize.literal(`"totalChallengeLikes"`), 'DESC']],
      limit: 10,
      logging: console.log
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
        'id',
        'pseudo',
        [
          Sequelize.fn(
            'COALESCE',
            Sequelize.fn(
              'SUM',
              Sequelize.col('participant.participation_likes')
            ),
            0
          ),
          'totalParticipationLikes'
        ],
      ],
      include: [
        {
          model: Participation,
          as: 'participant',    // doit correspondre à l’alias défini : User.hasMany(Participation, { as: 'participant', ... })
          attributes: [],
          required: false
        },
      ],
      group: ['User.id', 'User.pseudo'],
      order: [[Sequelize.literal(`"totalParticipationLikes"`), 'DESC']],
      limit: 10,
      logging: console.log
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Erreur getTopUsersByParticipationLikes:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};
