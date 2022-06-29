const {ENV:{PERS}} = require('../config/config');

let productsDAO
let cartsDAO

switch (PERS){
    case 'firebase':
        productsDAO = require('./products/productDaoFirebase');
        cartsDAO = require('./cart/cartDaoFirebase');
        break;
    case 'mongo':
        productsDAO = require('./products/productDaoMongo');
        cartsDAO = require('./cart/cartDaoMongo');
        break;
    case 'mariaDB':
        break;
    case 'sqlite':
        break;
    case 'memory':
        break;
    default:
        throw new Error('Invalid persistence configuration');
}

module.exports = {
    productsDAO,
    cartsDAO
}
