const express = require('express');
const mysql = require('mysql');
const path = require('path');

// Connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gps_data'
});
connection.connect();

// Initialisation de l'application Express
const app = express();

// Définition d'une route pour récupérer les données GPS depuis la base de données
app.get('/gps-data', (req, res) => {
  connection.query('SELECT lat, lng FROM gps_points', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

// Utilisation de l'élément "static" pour servir des fichiers statiques (comme les fichiers de la bibliothèque Leaflet.js)
app.use(express.static(path.join(__dirname, 'public')));

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
