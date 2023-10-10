const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Récupérer la liste des fichiers image dans le dossier "uploads"
const imageDir = 'uploads/';
const imageFiles = fs.readdirSync(imageDir).filter(file => {
  const fileExtension = file.toLowerCase().split('.').pop();
  return ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
});

// Configuration d'Express pour servir les fichiers statiques depuis le répertoire "public"
app.use(express.static('public'));

// Configuration du moteur de modèle EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route pour afficher la galerie d'images
app.get('/gallery', (req, res) => {
  res.render('gallery', { imageFiles });
});

// Route pour télécharger les images individuellement
app.get('/download/:image', (req, res) => {
  const imageName = req.params.image;
  const imagePath = path.join(__dirname, 'uploads', imageName);

  // Utilisez la méthode "download" pour renvoyer le fichier en téléchargement
  res.download(imagePath, imageName);
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
