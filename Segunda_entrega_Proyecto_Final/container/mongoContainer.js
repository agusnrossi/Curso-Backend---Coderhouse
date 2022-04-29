const mongoose=require('mongoose');
const {DB_CONFIG}=require('../config/config');

class MongoContainer {
    constructor(coll,schema) {
        this.connect().then(() => {
            console.log('connected to mongo')})
        this.model = mongoose.model(coll, schema);
    }


    async connect() {
        await mongoose.connect(DB_CONFIG.mongodb.uri)
    }

    async getById(id) {
        const document=await this.model.find({_id:id}),{__v,_id}=document[0];
        return {__v,_id, ...document[0]}
    }

    async getAll() {
        const documents=await this.model.find({});
        return documents.map(document=>({
            _id:document._id,
            ...document
        }))
    }

    async save(obj) {
        const document=new this.model(obj);
        await document.save();
    }

    async update(id,obj) {
        const updated=await this.model.updateOne({_id:id},{$set:{...obj}});
        return updated;
    }

    async delete(id) {
        const deleted=await this.model.deleteOne({_id:id});
        return deleted;
    }
        
}

module.exports = MongoContainer;
    
       