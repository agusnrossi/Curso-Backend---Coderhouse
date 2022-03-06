class Products {
  constructor() {
    this.products = [];
  }

  saveProducts(title, price, thumbnail) {
    try {
      this.products.push({
        id: this.products.length + 1,
        title: title,
        price: price,
        thumbnail: thumbnail,
      });
    } catch (error) {
      console.log(error);
    }
  }

  getProducts() {
    return this.products;
  }

  getById(id) {
    let product = this.products.find((product) => product.id == id);
    return product;
  }

  deleteProduct(id) {
    let product = this.products.find((product) => product.id == id);
    let index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }
}

module.exports = Products;
