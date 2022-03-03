const express = require("express");
const app = express();

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

let frase = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

frase.fraseCompleta = ["Frase inicial", "Frase intermedia", "Frase final"];

//-------------------Ejercicio 1-------------------//

app.get("/api/frase", (req, res) => {
  res.send({ palabra: frase });
});

//-------------------Ejercicio 2-------------------//

app.get("/api/palabras/:pos", (req, res) => {
  res.send(frase.fraseCompleta[req.params.pos]);
});

//-------------------Ejercicio 3-------------------//

app.post("/api/palabras", (req, res) => {
  let index = frase.fraseCompleta.push(req.body.palabra);
  res.json(index - 1);
});

//-------------------Ejercicio 4-------------------//

app.put("/api/palabras/:pos", (req, res) => {
  frase.fraseCompleta[req.params.pos] = req.body.palabra;
  res.send(frase.fraseCompleta[req.params.pos]);
});

//-------------------Ejercicio 5-------------------//

app.delete("/api/palabras/:pos", (req, res) => {
  frase.fraseCompleta.splice(req.params.pos, 1, "");
  res.send(frase);
});
