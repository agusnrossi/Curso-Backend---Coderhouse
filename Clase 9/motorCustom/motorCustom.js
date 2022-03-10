const express = require("express");
const { route } = require("express/lib/application");
const app = express();

const PORT = 8080;

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  console.log(err);
});

const fs = require("fs");

app.engine("cte", (filePath, datos, callback) => {
  fs.readFile(filePath, (err, contenido) => {
    if (err) {
      return callback(new Error(err));
    }
    const rendered = contenido
      .toString()
      .replace("^^titulo$$", "" + datos.title + "")
      .replace("^^mensaje$$", "" + datos.mensaje + "")

      .replace("^^autor$$", "" + datos.autor + "")
      .replace("^^version$$", "" + datos.version + "");
    return callback(null, rendered);
  });
});

app.set("views", "./views");
app.set("view engine", "cte");

app.get("/", (req, res) => {
  res.render("plantilla1", {
    title: "Titulo",
    mensaje: "hola mundo",
    autor: "Autor",
    version: "1.0.0",
  });
});
