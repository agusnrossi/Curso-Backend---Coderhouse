const fs = require("fs");

fs.promises
  .readFile("./info.txt", "utf-8")
  .then((contenido) => {
    let contenidoJson = JSON.parse(contenido);
    contenidoJson.author = "coderhouse";
    //console.log(JSON.stringify(contenidoJson, null, 2));
    return contenidoJson;
  })
  .then((contenidoJson) => {
    fs.promises.writeFile(
      "./package.json.coder",
      JSON.stringify(contenidoJson, null, 2)
    );
  })
  .catch((err) => {
    console.log(err);
  });
