const express = require("express");
const pug = require("pug");
const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/datos", (req, res) => {
  res.render("meter.pug", {
    titulo: req.query.titulo,
    valor: req.query.valor,
    maximo: req.query.maximo,
    minimo: req.query.minimo,
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
