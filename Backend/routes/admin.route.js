// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const AdminController = require('../controllers/admin.controller');

// Route protégée pour ajouter du personnel
router.post('/addPersonnel', AuthController.verifyToken, AuthController.checkRole('admin'), AdminController.addPersonnel);

// Route protégée pour modifier l'admin
router.post('/editAdmin', AuthController.verifyToken, AuthController.checkRole('admin'), AdminController.editAdmin);

// Route protégée pour obtenir les personnels
router.get('/personnels', AuthController.verifyToken, AdminController.getPersonnels);

module.exports = router;
