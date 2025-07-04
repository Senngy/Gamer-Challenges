// games.routes.js
import express from "express";

import { getAll, getById } from '../controllers/games.controller.js';

const router = express.Router();

router.get('/', getAll) // All the games
router.get('/:id', getById) // Game details

export default router;