const PERS = require('../../utils/dbConfig').PERS;

let ProductsDao;
let CartsDao;

switch(PERS) {
  case 'firebase':
    ProductsDao = require('./products/ProductsDaoFirebase');
    CartsDao = require('./cart/CartDaoFirebase');
    break;
  case 'mongo':
    ProductsDao = require('./products/ProductsDaoMongo');
    CartsDao = require('./cart/CartDaoMongo');
    break;
  case 'mariadb':
    break;
  case 'sqlite':
    break;
  case 'file':
    break;
  case 'memory':
    break;
  default:
    throw new Error('Invalid persistent method');
}

module.exports = {
  ProductsDao,
  CartsDao,
}