//produit.route

const express = require('express');
const router = express.Router();
const Produit = require('../models/produit.modal');

// Route pour créer un nouveau produit
router.post('/produit2', async (req, res) => {
  try {
    const nouveauProduit = new Produit(req.body);
    await nouveauProduit.save();
    res.status(201).send(nouveauProduit);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route pour obtenir tous les produits
router.get('/listerproduit', async (req, res) => {
  try {
    const produits = await Produit.find({});
    res.status(200).send(produits);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route pour obtenir un produit par ID
router.get('/produit2/:id', async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).send();
    }
    res.status(200).send(produit);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Route pour supprimer un produit par ID
router.delete('/produit2/:id', async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) {
      return res.status(404).send();
    }
    res.status(200).send({ message: 'Produit supprimé avec succès!' });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Mettre à jour un produit par ID
router.put('/produit2/:id', async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(produit);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit' });
  }
});



module.exports = router;
