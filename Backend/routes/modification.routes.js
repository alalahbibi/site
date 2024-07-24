// routes/modification.routes.js

const express = require('express');
const router = express.Router();
const Modification = require('../models/modification.model');

router.get('/:commandeId', (req, res) => {
  Modification.find({ commandeId: req.params.commandeId })
    .then(modifications => res.json(modifications))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => {
  const newModification = new Modification(req.body);

  newModification.save()
    .then(() => res.json('Modification added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
