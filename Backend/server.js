const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const commandesRoutes = require('./routes/commande.routes');
const produitsRoutes = require('./routes/produit.route');
const authRoutes = require('./routes/auth.routes');
const commandecolis = require('./routes/commande_colis');
const modificationRoutes = require('./routes/modification.routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/E-managePlus', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Connection error', error);
});

app.use('/api', commandesRoutes);
app.use('/users', produitsRoutes);
app.use('/auth', authRoutes);
app.use('/commandes', commandecolis);
app.use('/modifications', modificationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
