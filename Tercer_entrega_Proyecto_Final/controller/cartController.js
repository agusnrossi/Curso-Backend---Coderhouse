const {cartsDAO} = require('../daos/indexDao');
const product=require('../controller/productController');
const cart = new cartsDAO();

const postNewCart= async (req,res)=>{
    try{
        const totalCart=await cart.getCart();
        const newCart = {
            id: totalCart.length + 1,
            timestamp: Date.now(),
            products: []
        }
        cart.saveCart(newCart);;
    return res.json({result: newCart});
}catch(err){
    return res.json({error: err});
}
}


const deleteCart= async (req,res)=>{
    try{
    const {cartId} = req.params
    const deletedCart = await cart.removeFromCart(cartId)
    if (deletedCart.error) return res.status(404).send(deletedCart.error);
    return res.json({Eliminado:deletedCart});
}catch(err){
    return res.json({error: err});
}
}

const getCartProducts= async (req,res)=>{
    try{
    const {cartId} = req.params.cartId
    const theCart = await cart.getCart(cartId)
    if (theCart.error) return res.status(404).send(theCart.error);
    return res.json({Productos: theCart.Productos});
}
catch(err){
    return res.json({error: err});
}
}

const addToCart= async (req,res)=>{
    try{
    const cartId = req.params.cartId
    const productId = req.body.productId
    const allProduct = await product.getProduct()
    const theProduct = allProduct.find(product => product.id === +productId)
    const theCart = await cart.getById(cartId)
    theCart[0].products.push(theProduct)
    await cartApi.updateById(cartId, theCart[0])
    return res.json({response:'Se agregó el producto al carro.'})
}
catch(err){
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

module.exports={
    cart,
    postNewCart,
    deleteCart,
    getCartProducts,
    addToCart,
    deleteProductCart
}
