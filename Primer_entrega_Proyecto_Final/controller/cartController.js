const Cart = require('../api/apiCart');
const product=require('../controller/productController');
const cart = new Cart();

const postNewCart= async (req,res)=>{
    const newCart = await cart.newCart();
    res.json({result: newCart});
}

const deleteCart= async (req,res)=>{
    const {cartId} = req.params
    const deletedCart = await cart.removeFromCart(cartId)
    if (deletedCart.error) return res.status(404).send(deletedCart.error);
    return res.json({Eliminado:deletedCart});
}

const getCartProducts= async (req,res)=>{
    const {cartId} = req.params
    const theCart = await cart.getCart(cartId)
    if (theCart.error) return res.status(404).send(theCart.error);
    return res.json({Productos: theCart.Productos});
}

const addToCart= async (req,res)=>{
    const {cartId} = req.params
    const {productId} = req.body
    const newProduct = {cartId,productId}
    const addedProduct = await cart.addToCart(newProduct)
    if (addedProduct.error) return res.status(404).send(addedProduct.error);
    return res.json({Agregado:addedProduct});
}

const deleteProductCart= async (req,res)=>{
    const {cartId,productId} = req.params
    const deletedProduct = await cart.removeFromCart(cartId,productId)
    if (deletedProduct.error) return res.status(404).send(deletedProduct.error);
    return res.json({Eliminado:deletedProduct});
}

module.exports={
    cart,
    postNewCart,
    deleteCart,
    getCartProducts,
    addToCart,
    deleteProductCart
}
