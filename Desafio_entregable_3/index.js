const fs = require("fs");
const express = require("express");

let obj = {};
let arrayProducto = [];

//-------------------CLASE --------------------//

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }
  async save(producto) {
    try {
      obj = producto;
      obj.id = arrayProducto.length + 1;
      arrayProducto.push(obj);
      await fs.promises.writeFile(
        `./${this.nombreArchivo}`,
        JSON.stringify(arrayProducto, null, 2)
      );
      console.log("Se guardo el producto con exito!");
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      arrayProducto = JSON.parse(
        await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8")
      );
      return arrayProducto;
    } catch (error) {
      console.log(error);
    }
    return arrayProducto;
  }
}

//----------------------------------------------------------------------------//

const Productos = new Contenedor("productos.txt");

Productos.save({
  title: "Escuadra",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
});

Productos.save({
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
});

Productos.save({
  title: "Globo Terráqueo",
  price: 345.67,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
});

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Bienevenido a la API de productos");
});

app.get("/productos", async (req, res) => {
  try {
    const arrayProductos = await Productos.getAll();
    res.send(`<h2><strong> Array de Productos</strong></h2>
    <ul><li>${JSON.stringify(arrayProductos)}</li></ul>`);
  } catch (error) {
    res.send(error);
  }
});

app.get("/productos-random", async (req, res) => {
  try {
    const arrayProductos = await Productos.getAll();
    const randomProducto =
      arrayProductos[Math.floor(Math.random() * arrayProductos.length)];
    res.send(`<h1>Producto random</h1>
    <ul style="color:green">
    <li>Array de Producto:${JSON.stringify(randomProducto)}</li>
    <li> Titulo: ${JSON.stringify(randomProducto.title)}</li>
    <li> Precio: $${JSON.stringify(randomProducto.price)}</li>
    <li>URL: ${JSON.stringify(randomProducto.thumbnail)}</li></ul>`);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
