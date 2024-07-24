//produit.modal

const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  Image: String,
  Nom: String,
  Affiche: String,
  Prix: Number,
  Categorie: String,
  Remise: Number,
  Cout: Number,
  GestionStock: String,
  FraisLivraison: Number,
  CoutLivraison: Number,
  Stock: Number,
  quantite:Number
});

module.exports = mongoose.model('Produit', produitSchema);
