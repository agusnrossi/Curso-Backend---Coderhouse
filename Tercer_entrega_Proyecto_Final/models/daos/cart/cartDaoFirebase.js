<<<<<<< HEAD
const ContenedorFirebase = require('../../contenedores/contenedorFirebase');
=======
const FirebaseContainer= require('../../../container/firebaseContainer');
>>>>>>> 8031afd8eff374b5f54386c1c8c5b71091384847

class CartDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('carts');
  }
}

module.exports = CartDaoFirebase;