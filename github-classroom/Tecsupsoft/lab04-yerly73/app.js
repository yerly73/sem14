const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.use((req, res, next) => {
  const filePathWithoutExtension = path.join(__dirname, 'static', req.path);
  const filePathWithHtmlExtension = filePathWithoutExtension + '.html';

  // Comprueba si el archivo sin extensión existe
  fs.access(filePathWithoutExtension, fs.constants.F_OK, (err) => {
    if (err) {
      // El archivo sin extensión no existe, intenta con ".html"
      fs.access(filePathWithHtmlExtension, fs.constants.F_OK, (err) => {
        if (err) {
          // Ni el archivo sin extensión ni el archivo con ".html" existen, muestra error 404
          return res.status(404).send('Error 404: Página no encontrada...');
        }

        // El archivo con ".html" existe, envía ese archivo
        res.sendFile(filePathWithHtmlExtension);
      });
    } else {
      // El archivo sin extensión existe, envía ese archivo
      res.sendFile(filePathWithoutExtension);
    }
  });
});

app.listen(5000, () => {
  console.log('Servidor en el puerto 5000');
});
