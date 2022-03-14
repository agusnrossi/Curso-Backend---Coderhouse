const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  console.log(err);
});

app.set("view engine", "ejs");

app.get("/datos", (req, res) => {
  res.render("meter.ejs", {
    valor: req.query.valor,
    maximo: req.query.maximo,
    minimo: req.query.minimo,
  });
});
