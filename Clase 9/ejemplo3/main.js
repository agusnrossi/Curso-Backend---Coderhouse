const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

//configuracion de handlebars
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

//establecemos el motor de plantilla a utilizar
app.set("view engine", "hbs");
//establecemos el directorio de las vistas
app.set("views", "./views");
//espacio publico del servidor
app.use(express.static("public"));

fakeApi = () => [
  {
    name: "Katarina",
    lane: "midlaner",
  },
  { name: "Jayce", lane: "toplaner" },
  { name: "Heimerdinger", lane: "toplaner" },
  { name: "Jayce", lane: "midlaner" },
  { name: "Azir", lane: "midlaner" },
];

app.get("/", (req, res) => {
  res.render("main", { suggestedChamps: fakeApi(), listExists: true });
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  console.log(err);
});
