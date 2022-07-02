const PERS= require('../config/config').PERS


let ProductsDao;
let CartsDao;

switch(PERS) {
  case 'firebase':
    ProductsDao = require('./daos/products/productDaoFirebase')
    CartsDao = require('./daos/cart/cartDaoFirebase');
    break;
  case 'mongo':
    ProductsDao = require('./daos/products/productDaoMongo');
    CartsDao = require('./daos/cart/cartDaoMongo');
    break;
  default:
    throw new Error('Invalid persistent method');
}

module.exports = {
  ProductsDao,
  CartsDao,
}