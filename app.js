const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const imageDir = 'uploads/';
const imageFiles = fs.readdirSync(imageDir).filter(file => {
  const fileExtension = file.toLowerCase().split('.').pop();
  return ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
});

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/gallery', (req, res) => {
  res.render('gallery', { imageFiles });
});

app.get('/download/:image', (req, res) => {
  const imageName = req.params.image;
  const imagePath = path.join(__dirname, 'uploads', imageName);

  res.download(imagePath, imageName);
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
