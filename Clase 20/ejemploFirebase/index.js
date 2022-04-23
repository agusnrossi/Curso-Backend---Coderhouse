const admin = require('firebase-admin');
const configuraciones = require('./db/clase-20-da8c6-firebase-adminsdk-ixhuh-c958fd92f4.json')

admin.initializeApp({
    credential: admin.credential.cert(configuraciones),
    databaseURL: '"https://clase-20-da8c6-default-rtdb.firebaseio.com"'
});


CRUD()
async function CRUD() {
    const db = admin.firestore();
    const query = db.collection('usuarios')

    try {
        let id = 2;
        const doc = query.doc(`${id}`)
        await doc.delete()
        console.log('eliminado')
    }
    catch (error) {
        console.log(error)
    }
}
