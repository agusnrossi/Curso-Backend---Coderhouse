const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
app.use(express.static("public"));
const PORT = 8080;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("datos", {
    nombre: "Agustin",
    apellido: "Rossi",
    edad: 34,
    email: "agusrossi021287@gmail.com",
    telefono: "099-988-988",
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

(server.on = "error"),
  (err) => {
    console.log(err);
  };
