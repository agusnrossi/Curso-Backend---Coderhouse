class Products {
  constructor() {
    this.products = [];
  }

  saveProducts(prod) {
    const newProd = { ...prod, id: ++this.id }
        this.products.push(newProd)
        return newProd
  }

  getProducts() {
    return [...this.products];
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

//-------------------------------------------------------------------------------------//
module.exports =  Products;
