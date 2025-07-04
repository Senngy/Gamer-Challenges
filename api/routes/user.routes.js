// user.routes.js
import express from 'express';

const router = express.Router();

router.get('/',) // All the users 
router.get('/:id/stats',) // Stats of users ( challenges, participations, likes)
router.patch('/:id') // Update user profile PRIVATE

export default router; 