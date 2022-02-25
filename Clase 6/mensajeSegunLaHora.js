/*const http = require("http");

const server = http.createServer((peticion, respuesta) => {
  let hora = new Date().getHours();
  if (hora > 6 && hora < 12) {
    respuesta.end("<h1>Buenos días</h1>");
  } else if (hora > 13 && hora < 19) {
    respuesta.end("Buenas tardes");
  } else {
    respuesta.end("Buenas noches");
  }
});

const connectedServer = server.listen(8080, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});

*/
//-----------------------------//

const http = require("http");
const server = http.createServer((peticion, respuesta) => {
  respuesta.end(verificarHora());
});

const connectedServer = server.listen(8000, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});

const verificarHora = () => {
  const hora = new Date().getHours();
  saludo = "";
  if (hora > 6 && hora < 13) {
    saludo = "Buenos días";
  } else if (hora > 13 && hora < 19) {
    saludo = "Buenas tardes";
  } else {
    saludo = "Buenas noches";
  }
};
