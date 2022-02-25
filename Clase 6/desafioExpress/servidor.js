const express = require("express");
const app = express();

const PORT = 8080;
let contador = 0;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

app.get("/", (req, res) => {
  contador++;
  res.send(
    `<h1 style="color: blue">Bienvenido a  mi primer servidor en Express</h1>`
  );
});

app.get("/visitas", (req, res) => {
  res.send(`<h1 style="color: blue">las visitas son: ${contador}</h1>`);
});
