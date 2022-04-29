
const express = require('express');
const router=express.Router();
const cartRouter=require('./cartRoute/cartRouter');
const productRouter=require('./productRoute/productRoute');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.use('/cart',cartRouter);
router.use('/productos',productRouter);

module.exports=router;  

 