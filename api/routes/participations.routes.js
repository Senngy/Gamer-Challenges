// participations.routes.js
import express from 'express';

import { addParticipation } from '../controllers/participations.controller.js';

const router = express.Router();

router.post('/', addParticipation) // Create participations PRIVATE
router.delete('/:id') // delete participations PRIVATE


export default router;