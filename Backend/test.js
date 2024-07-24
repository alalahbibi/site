const axios = require('axios');
const { API_URL, API_KEY } = require('./config/api'); // Assurez-vous que le chemin est correct

// Exemple de données à envoyer
const data = {
    action: 'add',
    id: '819',
    cle_api: API_KEY,
    tel_cl: '28778067',
    nom_prenom_cl: 'nour belguesmi',
    ville_cl: 'Kasserine',
    delegation_cl: 't',
    cod: '1',
    libelle: 't',
    nb_piece: '1',
    adresse_cl: 'foussena kasserine',
    remarque: '1',
    tel_2_cl: '1',
    service: 'Livraison'
};

// Formater les données avec URLSearchParams
const params = new URLSearchParams(data).toString();

// Envoyer la requête POST
axios.post(API_URL, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
.then(response => {
    console.log('Réponse de l\'API:', response.data);
})
.catch(error => {
    console.error('Erreur lors de l\'envoi de la requête:', error.response ? error.response.data : error.message);
});
