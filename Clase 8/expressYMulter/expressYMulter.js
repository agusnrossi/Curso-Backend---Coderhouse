const express = require("express");
const multer = require("multer");
const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//set storage

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadfile");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

let upload = multer({ storage: storage });

app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("No file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

server.on("error", (err) => {
  console.log(err);
});
