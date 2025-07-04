// user.routes.js
import express from 'express';

import { getAll, getById } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', getAll) // All the users
router.get('/:id', getById) // /!\ SET TO PRIVATE (route for the details of a specific user)
//router.get('/:id/stats',) // Stats of users ( challenges, participations, likes)
//router.patch('/:id') // Update user profile PRIVATE

export default router;