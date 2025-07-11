// participations.routes.js
import express from 'express';
import { addParticipation } from '../controllers/participations.controller.js';
import { validateUserCreationParticipation } from '../middlewares/participation.middleware.js';
// import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', addParticipation) // Create participations PRIVATE
// router.delete('/:id') // delete participations PRIVATE // Ne pas oublier d'implémenter la fonction authenticate 


export default router;