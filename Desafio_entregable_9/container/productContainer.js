const { Product } = require('../models/products');

class Products {

  constructor(products) {

    this.products = products || []


  }


  async getProducts(id) {
    this.products = await Product.find();
    if (id) {
      const product = await Product.findById(id);
      if (product.length === 0) {
        return { error: 'producto no encontrado.' }
      }
      return product;
    }
    if (this.products.length === 0) {
      return { error: 'no hay productos cargados.' }
    }
    return this.products;
  };

  async addProduct(product) {
    return await Product.create(product);
  };

  async updateProduct(product) {
    const res = await Product.updateOne({ _id: product.id }, { $set: { ...product } });

    if (res) {
      return res;
    }
    return { error: 'producto no encontrado.' }
  };

  async deleteProduct(id) {
    const deletedItem = await Product.deleteOne({ _id: id });

    if (deletedItem) {
      return deletedItem;
    }
    return { error: 'producto no encontrado.' }
  }
}


//-------------------------------------------------------------------------------------//
module.exports = Products;
