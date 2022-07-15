const mongodb = require('mongodb');
const {errorLogger} = require('../../../utils/logger/index');
const dbConfig = require('../../../../db/config/dbConfig');
const dbConfig = require('../../../../db/config/config');
const ProductDTO = require('../../dtos/message.dto');
const {STATUS} = require('../../../utils/constants/api.constants');
const CustomError = require('../../../utils/errors/customError');
const {MongoClient,ObjectId} = mongodb;

class ProductsDaoMongo{

    static #dbinstances = {}
  
    constructor(database){
      if(!ProductsDaoMongo.#dbinstances[database]){
          console.log(`[${config.NODE_ENV.trim()}] Connecting to ${database} database...`);
          MongoClient.connect(dbConfig.mongodb)
          .then((connection)=>{
              ProductsDaoMongo.#dbinstances[database] = this;
              const db = connection.db(database);
              this._collection = db.collection('products');
              console.log(`[${config.NODE_ENV.trim()}] Connected to ${database}`) 
          })
      } else{
          return ProductsDaoMongo.#dbinstances[database]
      }
  }
    async getAll(filter={}){
      try {
          //const documents = await this.model.find(filter, {__v:0}).populate('author')
          return await this._collection.find({}).toArray();
      } catch (error) {
          errorLogger.error(new Error(error));
          throw new CustomError(
              STATUS.SERVER_ERROR,
              'Error fetching all products',
              error
            )
      }
    }
  
    async getProductById(id) {
      try {
        return await this._collection.findOne({ _id: ObjectId(id) });
      }
      catch(error) {
        throw new CustomError(
          STATUS.SERVER_ERROR,
          `Error fetching product with id ${id}`,
          error
        )
      }
    }
    async createItem(resourceItem) {
        try {
          const newProduct = new ProductDTO(resourceItem);
          await this._collection.insertOne(newProduct);
          return newProduct;
        }
        catch (error) {
          errorLogger.error(new Error(error));
          throw new CustomError(
            STATUS.SERVER_ERROR,
            'Error creating item',
            error
          )
        }
      }
  }
  
  module.exports = ProductsDaoMongo