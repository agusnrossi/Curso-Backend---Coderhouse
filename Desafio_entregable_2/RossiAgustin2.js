const fs = require("fs");

let obj = {};
let arrayProducto = [];

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

  async getById(id) {
    try {
      arrayProducto = JSON.parse(
        await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8")
      );
      let productoId = arrayProducto.find((producto) => producto.id == id);
      productoId === undefined ? console.log(null) : console.log(productoId);
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      arrayProducto = JSON.parse(
        await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8")
      );
      console.log(arrayProducto);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      let arrayProductos = JSON.parse(
        await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8")
      );

      let index = arrayProductos.indexOf(
        arrayProductos.find((producto) => producto.id == id)
      );

      let deleteId = arrayProducto.splice(index, 1);

      console.log(JSON.stringify(deleteId));

      console.log(JSON.stringify(arrayProducto, null, 2));
      await fs.promises.writeFile(
        `./${this.nombreArchivo}`,
        JSON.stringify(arrayProducto, null, 2)
      );
    } catch {
      console.log("no se encontro!");
    }
  }

  async deleteAll() {
    try {
      arrayProducto.length = 0;
      await fs.promises.writeFile(
        `./${this.nombreArchivo}`,
        JSON.stringify(arrayProducto)
      );
      console.log("Se elimino todo!");
    } catch (error) {
      console.log(error);
    }
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

//----------------------------------------------------------------------------//

Productos.getById(3);
Productos.getAll();
Productos.deleteById(2);
setTimeout(() => {
  Productos.deleteAll();
}, 10000);
