const {mongoose} = require('mongoose');


class MongoContainer {
    constructor(coll, schema) {
        this.model = mongoose.model(coll, schema);
    }


    async getById(id) {
        const document = await this.model.findById(id, { __v: 0 }).lean();
        return document
    }

    async getAll() {
        const documents = await this.model.find({}, { __v: 0 }).lean();
        return documents
    }

    async save(obj) {
        const document = new this.model(obj);
        return await document.save();
    }

    async update(id, obj) {
        const updatedDoc = await this.model.updateOne({ _id:id }, { $set:{...obj} })
        if(!updatedDoc.acknowledged){
            return {response:'No se encuentra el dato solicitado'}
        }
        return updatedDoc
    }

    async delete(id) {
        const deleted = await this.model.deleteOne({ _id: id });
        return deleted;
    }

}

module.exports = MongoContainer;

