const express = require('express');
const router = express.Router();
const Commande = require('../models/commande.modal');



//enregistrer les commande dans le backend monogdb
router.post('/commande', async (req, res) => {
  console.log('Données reçues pour ajouter une commande:', req.body);
  try {
    const commande = new Commande(req.body);
    await commande.save();
    console.log('Commande ajoutée avec succès:', commande);
    res.status(201).send(commande);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la commande:', error);
    res.status(400).send({ error: 'Erreur lors de l\'ajout de la commande', details: error.message });
  }
});


// Route pour obtenir toutes les commandes
router.get('/listercommande', async (req, res) => {
  try {
    const commandes = await Commande.find({});
    res.status(200).send(commandes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route pour supprimer une commande spécifique
router.delete('/commande/:id', async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    if (!commande) {
      return res.status(404).send({ error: 'Commande non trouvée' });
    }
    res.status(200).send(commande);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Route pour mettre à jour une commande spécifique
router.put('/commande/:id', async (req, res) => {
  console.log('Données reçues pour mettre à jour une commande:', req.body);
  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!commande) {
      return res.status(404).send({ error: 'Commande non trouvée' });
    }
    console.log('Commande mise à jour avec succès:', commande);
    res.json(commande);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande', details: error.message });
  }
});




module.exports = router;
