const firebaseContainer = require('../../../container/firebaseContainer');

class prductDaoFirebase extends firebaseContainer {
    constructor() {
        super('products');
    }
}

module.exports = prductDaoFirebase;