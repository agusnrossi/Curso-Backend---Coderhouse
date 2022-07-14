const ProductsDaoMongo = require('./products.mongo.dao');


class ProductsDAOSFactory {
  static getDAOS(type) {
    let productDAO;
    switch(type.toLowerCase()) {
      case 'mongo':
        productDAO = new ProductsDaoMongo('products');
        break;
      default:
        throw new Error('Invalid data source, please provide one of the following (MONGO)')
    }
    return {
      productDAO,
    }
  }
}

module.exports = ProductsDAOSFactory;