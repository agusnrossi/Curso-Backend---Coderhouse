const express = require("express");
const res = require("express/lib/response");
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

//-----------------Ejercicio 1-----------------//

//-----------------a)------------------//
app.get("/api/suma/:num1/:num2", (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const suma = num1 + num2;
  res.json({ suma: suma });
});

//-----------------b)------------------//

app.get("/api/suma", (req, res) => {
  res.json({ suma: parseInt(req.query.num1) + parseInt(req.query.num2) });
});

//-----------------c)------------------//

app.get("/api/operacion/:num1:num2", (req, res) => {
  res.json({ suma: parseInt(req.params.num1) + parseInt(req.params.num2) });
});

//-----------------Ejercicio 2-----------------//

app.post("/api", (req, res) => {
  res.json({
    status: "post",
  });
});

app.delete("/api", (req, res) => {
  res.json({
    status: "delete",
  });
});

app.put("/api", (req, res) => {
  res.json({
    status: "put",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
