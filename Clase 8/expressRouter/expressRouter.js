const express = require("express");
const app = express();
const PORT = 8080;

const routerMascotas = express.Router();
const routerPersonass = express.Router();

routerMascotas.use(express.urlencoded({ extended: true }));
routerMascotas.use(express.json());

routerPersonass.use(express.urlencoded({ extended: true }));
routerPersonass.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

server.on("error", (err) => {
  console.log(err);
});

const mascotas = [];
const personas = [];

routerMascotas.get("/", (req, res) => {
  res.json(mascotas);
});

routerMascotas.post("/", (req, res) => {
  console.log(req.body);
  let nuevaMascota = req.body;
  mascotas.push(nuevaMascota);
  res.json({ "se agrego correctamente": nuevaMascota });
});

routerPersonass.get("/ruta", (req, res) => {
  res.json(personas);
});

routerPersonass.post("/ruta", (req, res) => {
  console.log(req.body);
  let nuevaPersona = req.body;
  personas.push(nuevaPersona);
  res.json({ "se agrego correctamente": nuevaPersona });
});

app.use("/mascotas", routerMascotas);
app.use("/personas", routerPersonass);
