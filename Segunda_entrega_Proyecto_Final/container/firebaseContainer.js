const { credential } = require('firebase-admin');
const admin = require('firebase-admin');
const {getFirestore } = require('firebase-admin/firestore')
const {DB_CONFIG} = require('../config/config');


admin.initializeApp({
    credential: admin.credential.cert(DB_CONFIG.firebase.credential),
    databaseURL: DB_CONFIG.firebase.databaseURL
});


class FirebaseContainer {

    constructor(coll) {
        const db = getFirestore();
        this.query = db.collection(coll)
    }

    async getById(id) {
        try {
            const doc = this.query.doc(id)
            if (!doc) {
                throw new Error('no se encuentra esa Id');
            }
            const document = await doc.get();
            return document.data();
        } catch (error) {
            return res.json({ Error: `No se pudo realizar esta acción`, error })
        }
    }

    async getAll(){
        try{
            const doc= await this.query.get();
            const documents=doc.docs;
            return documents.map(document=>({
                id:document.id,
                ...document.data()
            }))
        }catch(error){
            return res.json({Error: 'No se puede realizar la accion', error})
        }
        }
    

    async save(obj) {
        try {
            const doc=this.query.doc();
            return await doc.set(obj);
        }
        catch(error){
            return res.json({Error: 'No se puede realizar la accion', error})
        }
    }

    async update(id,obj){
        try{
            const doc=this.query.doc(id);
            return await doc.update(obj);
        }catch(error){
            return res.json({Error: 'No se puede realizar la accion', error})
        }
    }

    async delete(id){
        try{
            const doc=this.query.doc(id);
            return await doc.delete();
        }catch(error){
            return res.json({Error: 'No se puede realizar la accion', error})
        }
    }
}


module.exports = FirebaseContainer;


