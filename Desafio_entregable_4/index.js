const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//app.use("/api/productos", router);

app.use((err, req, res, _next) => {
  console.log(err);
  res.status(500).send("Something broke!");
});

const PORT = 8080;

const router = require("./router/router");
app.use("/api/productos", router);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
  console.log(err);
});

module.exports = server;
