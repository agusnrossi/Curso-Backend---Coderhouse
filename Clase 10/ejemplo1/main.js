const express = require("express");
const pug = require("pug");
const app = express();

app.use("/static", express.static(__dirname + "public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/main", (req, res) => {
  res.render("main", { mensaje: "Hola mundo" });
});

app.get("/urlparam", (req, res) => {
  res.send(req.query);
});

app.get("/urljson", (req, res) => {
  res.send(req.body);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
