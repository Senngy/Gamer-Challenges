// participations.routes.js
import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { addParticipation } from '../controllers/participations.controller.js';
import { validateUserCreationParticipation } from '../middlewares/participation.middleware.js';


const router = express.Router();

router.post('/', authenticate, validateUserCreationParticipation, addParticipation) // Authentification TESTÉE & VALIDÉE - Créer un nouveau challenge

export default router;