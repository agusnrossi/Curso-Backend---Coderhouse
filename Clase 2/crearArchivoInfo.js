const fs = require("fs");
let info = {};

let datos = fs.readFile("./package.json", (err, datos) => {
  if (err) {
    console.log(err);
  } else {
    let datosParseados = JSON.parse(datos);
    console.log(JSON.stringify(datosParseados, null, 2));
    fs.writeFile(
      "./info.txt",
      JSON.stringify(datosParseados, null, 2),
      (err, datos) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Archivo creado");
        }
      }
    );
  }
});
