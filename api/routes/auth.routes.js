import express from 'express';
import { authenticate, validateUserCreation, validateUserLogin, validateUserUpdatePassword, validateUserUpdatePseudo } from '../middlewares/auth.middleware.js';
import { login, register, me, logout, modifyPassword, modifyPseudo, deleteAccount } from '../controllers/auth.controller.js';

const router = express.Router();   

router.get('/me', authenticate, me); // Récupérer l'utilisateur actuel (PRIVATE)
router.post('/login', validateUserLogin, login); // Connecter un utilisateur
router.post('/register', validateUserCreation, register); // Enregistrer un nouvel utilisateur 
router.post('/logout', authenticate, logout); // Déconnecter un utilisateur (PRIVATE)
router.patch('/me/password', authenticate, validateUserUpdatePassword, modifyPassword); // MAJ du MDP de l'utilisateur actuel (PRIVATE)
router.patch('/me/pseudo', authenticate, validateUserUpdatePseudo, modifyPseudo); // Mettre à jour le pseudo de l'utilisateur actuel (PRIVATE)
router.delete('/me', authenticate, deleteAccount); // Supprimer l'utilisateur actuel (PRIVATE)

export default router;