const FirebaseContainer= require('../../../container/firebaseContainer');

class cartDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts');
    }
}


module.exports = cartDaoFirebase;
