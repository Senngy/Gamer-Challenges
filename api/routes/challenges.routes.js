// challenges.routes.js
import express from 'express';

const router = express.Router();

router.get('/',) // All of the challenges 
router.post('/',) // Create a challenge
router.get('/:id',) // Details of a challenge
router.get('/:id/participate',) // Participate in a challenge (pas dans le cahier des charges)
router.get('/:id/participants',) // List of participants in a challenge (participations dans le cahier des charges)
router.get('/:id/likes',) // Get & See the likes of challenges
router.post('/:id/likes',) // Give a like to a challenge PRIVATE
// router.patch('/') // If the creator want to edit the challenge ? (pas dans le cahier des charges)

export default router;