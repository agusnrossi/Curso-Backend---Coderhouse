const express = require("express");
const errMiddleware = require("./public/src/errors/middleware/errors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(errMiddleware);

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
