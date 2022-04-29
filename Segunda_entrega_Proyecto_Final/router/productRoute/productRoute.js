const express = require('express');
const router=express.Router();
const {adminChecker}=require('../../middleware/adminCheck');

const {
getAllProducts,
getProductById,
saveNewProduct,
updateProduct,
deleteProduct,
}=require('../../controller/productController');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/',adminChecker,getAllProducts);

router.get('/:productId',adminChecker,getProductById);
router.put('/:productId',adminChecker,updateProduct);
router.post('/',adminChecker,saveNewProduct);
router.delete('/:productId',adminChecker,deleteProduct);


module.exports=router;