const express = require('express');

const {
    postNewCart,
    deleteCart,
    getCartProducts,
    addToCart,
    deleteProductCart,
    purchaseCart
}=require('../../controller/cartController');

const router=express.Router()

router.use(express.json());
router.use(express.urlencoded({extended:true}));


router.get('/', (req,res)=>{
    res.render('cart.html')
})

router.post('/',postNewCart);
router.get('/:cartId',getCartProducts);
router.delete('/:cartId/products/:productosId',deleteProductCart);
router.post('/:cartId/products/:productosId',addToCart);
router.delete('/:cartId',deleteCart);
router.post('/:cartId', purchaseCart)



module.exports= router;



