const express = require('express');
const router=express.Router();
const {adminChecker}=require('../../middleware/adminCheck');

const {
    postNewCart,
    deleteCart,
    getCartProducts,
    addToCart,
    deleteProductCart
}=require('../../controller/cartController');

router.use(express.json());
router.use(express.urlencoded({extended:true}));


router.post('/',adminChecker,postNewCart);
router.get('/:cartId',adminChecker,getCartProducts);
router.delete('/:cartId/products/:productosId',adminChecker,deleteProductCart);
router.post('/:cartId/products/:productosId',adminChecker,addToCart);
router.delete('/:cartId',adminChecker,deleteCart);



module.exports= router;



