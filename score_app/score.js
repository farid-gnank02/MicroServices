const express = require('express');
const app = express();

const port = process.env.PORT || 3001;  // Le tracking se fera sur le port 3001

const fs = require('fs');



app.use(express.json());

// Suivi du score d'un joueur
app.post('/setscore', (req, res) => {
  const scoreData = req.body;

    // Enregistrement des données dans un fichier JSON
    const cheminFichier = 'score.json';

    fs.readFile(cheminFichier, 'utf8', (err, data) => {
      if (err) {
          console.error("Erreur de lecture du fichier JSON :", err);
          return;
      }
  
      // Analyser le JSON
      const objetJSON = JSON.parse(data);
  
      // Mettre à jour les valeurs
      objetJSON.nb_try = scoreData["nb_try"]+objetJSON.nb_try ;  // Nouvelle valeur pour average_try
      objetJSON.success = scoreData["success"]+objetJSON.success;     // Nouvelle valeur pour success
  
      // Conversion l'objet JavaScript modifié en chaîne JSON
      const nouvelleDonneeJSON = JSON.stringify(objetJSON, null, 2);
  
      
      fs.writeFile(cheminFichier, nouvelleDonneeJSON, 'utf8', (err) => {
          if (err) {
              console.error("Erreur d'écriture dans le fichier JSON :", err);
              return;
          }
          console.log('Les valeurs ont été mises à jour avec succès !');
      });
  });
});

// Affichage du score d'un joueur
app.get('/getscore', (req, res) => {
  const filePath = 'score.json';

  try {
      // Lecture du fichier JSON
      const data = fs.readFileSync(filePath, 'utf-8');
      const scoreData = JSON.parse(data);

      // Renvoi des données en réponse
      res.json(scoreData);

  } catch (error) {
      console.error('Erreur lors de la lecture du fichier JSON :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des scores.' });
  }
});


app.listen(port, () => {
    console.log(`Score app listening on http://localhost:${port}/getscore`);
});
