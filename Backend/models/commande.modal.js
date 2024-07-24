// commande.modal.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,
  Nom: String,
  Prix: Number,
  quantite: Number,
  total: Number
});

const commandeSchema = new mongoose.Schema({
  Statut: String,
  Societe: String,
  NotePersonel: String,
  NomClient: String,
  NoteClinet: String,
  TelephoneClient: String,
  PhoneClient: String,
  AdresseClinet: String,
  VilleClinet: String,
  DelegationClinet: String,
  CoutLivraison: Number,
  FraisLivraison: Number,
  total: Number,
  produits: [productSchema],
  Date: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Commande', commandeSchema);
