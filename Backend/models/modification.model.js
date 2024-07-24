// models/modification.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modificationSchema = new Schema({
  commandeId: { type: String, required: true },
  date: { type: Date, required: true },
  modifiedBy: { type: String, required: true },
  details: { type: String, required: true }
});

const Modification = mongoose.model('Modification', modificationSchema);

module.exports = Modification;
