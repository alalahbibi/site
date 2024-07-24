const express = require('express');
const axios = require('axios');
const router = express.Router();
const Commande = require('../models/commande.modal');

const API_URL = 'https://api.coliexpres.com';
const API_KEY = 'RH2VZANPHTDAOWK'; 

router.post('/create', async (req, res) => {
    const {
        id,
        tel_cl,
        nom_prenom_cl,
        ville_cl,
        delegation_cl,
        cod,
        libelle,
        nb_piece,
        adresse_cl,
        remarque,
        tel_2_cl,
        service
    } = req.body;

    // Vérification des données
    if (!id || !tel_cl || !nom_prenom_cl || !ville_cl || !delegation_cl || !cod || !libelle || !nb_piece || !adresse_cl || !remarque || !tel_2_cl || !service) {
        return res.status(400).json({
            message: 'Les données sont incomplètes. Veuillez vérifier que tous les champs requis sont fournis.'
        });
    }

    try {
        const params = new URLSearchParams({
            action: 'add',
            id,
            cle_api: API_KEY,
            tel_cl,
            nom_prenom_cl,
            ville_cl,
            delegation_cl,
            cod,
            libelle,
            nb_piece,
            adresse_cl,
            remarque,
            tel_2_cl,
            service
        }).toString();

        // Log des paramètres envoyés
        console.log('Params:', params);

        const response = await axios.post(API_URL, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        res.status(200).json({
            message: 'Commande enregistrée avec succès',
            data: response.data
        });
    } catch (error) {
        // Log des détails de l'erreur pour le débogage
        console.error('Erreur lors de l\'enregistrement de la commande:', error);

        res.status(500).json({
            message: 'Erreur lors de l\'enregistrement de la commande',
            error: error.response ? error.response.data : error.message
        });
    }
});

module.exports = router;
