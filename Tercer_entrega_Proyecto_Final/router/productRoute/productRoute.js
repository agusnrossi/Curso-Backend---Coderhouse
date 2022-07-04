const express = require('express');
const router = express.Router();


const { getAllProducts,
       getProductById,
       saveNewProduct,
       deleteProduct,
        updateProduct } = require('../../controller/productController');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', getAllProducts);

router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);
router.post('/', saveNewProduct);
router.delete('/:productId', deleteProduct);


module.exports = router;