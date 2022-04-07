const Product = require('../api/apiProduct');
const product = new Product();

const  getAllProducts = async (req, res) => {
    const products = await product.getProducts();
    res.send(products);
}

const getProductById = async (req, res) => {
    const { productId } = req.params
    const searchProduct = product.getById(productId)
    return res.json({result: searchProduct });
};

const saveNewProduct = async (req, res) => {
    const newProduct = product.saveProduct(req.body)
    const productSaved = await product.saveProduct(newProduct);
    return res.json({ result: productSaved });
}

const updateProduct = (req,res)=>{
    const {productId} = req.params
    const {name,desc,price,image} = req.body
    const newProduct = {name,desc,price,image}

    if (!name || !desc || !image || !price ) return { error: 'Todos los campos son obligatorios!' };
    const updatedProduct = product.updateById(newProduct, productId)
    return res.json({Nuevo:updatedProduct.name})
}
const deleteProduct = (req,res)=>{
    const {productId} = req.params
    const deletedProduct = product.deleteById(productId)
    if (deletedProduct.error) return res.status(404).send(deletedProduct.error);
  return res.json({Eliminado:deletedProduct});
};

module.exports = {
    product,
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
}
