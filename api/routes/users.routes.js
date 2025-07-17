// user.routes.js
import express from 'express';
import upload from '../upload/avatarUpload.js';

import { getAll, getById, getTopUsersByChallengeLikes, getTopUsersByParticipationLikes, updateAvatar } from '../controllers/users.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get('/', getAll) // All the users
router.get('/topUsersByChallengeLikes', getTopUsersByChallengeLikes)
router.get('/topUsersByParticipationLikes', getTopUsersByParticipationLikes)
router.get('/:id', getById) // Route for the details of a specific user, possibly add Stats of users ( challenges, participations, likes)
router.post('/:id/avatar', authenticate, upload.single('avatar'), updateAvatar)



export default router;