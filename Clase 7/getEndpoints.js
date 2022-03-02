const express = require("express");
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const frase = "Hola mundo como estan";

app.get("/api/frase", (req, res) => {
  res.send(frase);
});

app.get("/api/letras/:num", (req, res) => {
  const letra = frase[req.params.num];
  //res.json(letra);
  if (isNaN(req.params.num)) {
    res.json({ error: "El parametro debe ser un numero" });
  } else {
    letra !== undefined ? res.send(letra) : res.send("No existe esa letra");
  }
});

app.get("/api/palabras/:num", (req, res) => {
  const palabra = frase.split(" ")[req.params.num];
  //res.json(letra);
  if (isNaN(req.params.num)) {
    res.json({ error: "El parametro debe ser un numero" });
  } else {
    palabra !== undefined
      ? res.send(palabra)
      : res.send("No existe esa palabra");
  }
});
