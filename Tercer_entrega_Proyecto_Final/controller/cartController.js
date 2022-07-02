const {CartsDao} = require('../models/indexDaos');
const {product}=require('./productController');
const userDaoMongo=require('../models/daos/User/userDao')
const mongoose=require('mongoose')
const {newPurchase} =require('../utils/nodemailer')
const {loggerInfo,loggerError} = require('../logger/index')

const cartApi = new CartsDao();
const userApi= new userDaoMongo()


const postNewCart= async (userId,res)=>{
    try{
        const totalCart=await cartApi.getCart();
        const newCart = {
            id: totalCart.length + 1,
            timestamp: Date.now(),
            products: []
        }
       const newMongoCart= await cartApi.save(newCart)
       return newMongoCart._id
}catch(err){
    loggerError.error(error)
    return res.json({Error: `No se pudo realizar esta acción`, error})
}
}


const deleteCart= async (req,res)=>{
    try{
        const cartId = req.params.cartId
        cartApi.deleteById(cartId)
        return res.json({response:`Su carro id:${cartId} fué eliminado`})
}catch(err){
    loggerError.error(error)
    return res.json({error: err});
}
}

const getCartProducts= async (req,res)=>{
    try{
        const cartId = req.params.cartId
        const theCart = await cartApi.getById(cartId)
      
        return res.json(theCart[0].products)
}
catch(err){
    loggerError,error(error)
    return res.json({Error: `No se pudo realizar esta acción`, error})
}
}

const addToCart= async (req,res)=>{
    try{
        const cartId = mongoose.Types.ObjectId(req.params.cartId);
        const productId = mongoose.Types.ObjectId(req.params.productId);
        const theProduct = await productsApi.getById(productId)
        
        const theCart = await cartApi.getById(cartId);
        theCart.products.push(theProduct);
    
        await cartApi.updateById(cartId, theCart);
    return res.json({response:'Se agregó el producto al carro.'})
}
catch(err){
    loggerError.error(error)
    return res.json({error: err});
}
}

const deleteProductCart= async (req,res)=>{
    try{
    const {cartId,productId} = req.params
    const deletedProduct = await cart.removeFromCart(cartId,productId)
    if (deletedProduct.error) return res.status(404).send(deletedProduct.error);
    return res.json({Eliminado:deletedProduct});
}catch(err){
    return res.json({error: err});
}
}

const purchaseCart = async(req,res)=>{
    try {
        const cartId = mongoose.Types.ObjectId(req.params.cartId);
        const theCart = await cartApi.getById(cartId);
        const userId = mongoose.Types.ObjectId(theCart.owner);
        const theOwner = await userApi.getById(userId);

        const newCart = {...theCart._doc, products:[]}

        await newPurchase(theOwner, theCart)

        await cartApi.updateById(cartId, newCart)

        return res.json({response: 'Pedido realizado. Compra en Proceso'})
    
    } catch (error) {
        loggerError.error(error);
        return res.json({Error: `No se pudo realizar esta acción`, error})
    } 
}



module.exports={
   
    postNewCart,
    deleteCart,
    getCartProducts,
    addToCart,
    deleteProductCart,
    purchaseCart
}
