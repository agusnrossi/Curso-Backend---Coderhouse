const createTableProducts = require("../db/scripts/mysql.createTable.js");
const insertProduct = require("../db/scripts/mysql.insertProduct.js");
const selectProducts = require("../db/scripts/mysql.selectProduct.js");
const deleteProduct = require("../db/scripts/mysql.deleteProduct.js");


class Products {
  constructor(path) {

    this.path = path;
  }

  async initProduct() {
    try {
      await createTableProducts();
      console.log("Table products created");
    } catch (err) {
      console.log(err);
    }
  }

  async getProducts() {
    await this.initProduct();
    try {
      const products = await selectProducts();
      return products;
    } catch (error) {
      console.log("No se pudo leer el archivo.");
    }
  }

  async insertProduct(product) {
    try {
      await insertProduct(product);
      console.log('Product inserted');
    } catch (err) {
      console.log(err);
    }

  }

  async deleteProduct(id) {
    try {
      await deleteProduct(id);
      console.log('Product deleted');
    } catch (err) {
      console.log(err);
    }

  }

  async saveProduct(product) {
    const products = await this.getProducts();
    let newID
    if (products.length == 0) {
      newID = 1;
    } else {
      newID = products[products.length - 1].id + 1;
    }

    const newProduct = { ...product, id: newID };
    this.elements.push(newProduct);

    try {
      await insertProduct(newProduct);
      return newID
    } catch (err) {
      console.log(`Error al guardar:${err}`)
    }
  }

  

}

//-------------------------------------------------------------------------------------//
module.exports = Products;
