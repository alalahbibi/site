const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Route pour l'inscription
router.post('/register', authController.register);

// Route pour le login
router.post('/login', authController.login);

// Route pour récupérer un utilisateur par ID
router.get('/user/:id', authController.getUserById);

// Route to get all users
router.get('/users', authController.getAllUsers);

// Route pour supprimer un utilisateur par ID
router.delete('/user/:id', authController.deleteUser);

module.exports = router;
