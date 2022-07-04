const {ProductsDao}=require('../models/indexDaos.js')
const productApi = new ProductsDao();

const  getAllProducts = async (req, res) => {
    const allProducts = await productApi.getAll()
    return res.json(allProducts)
}

const getProductById = async (req, res) => {
    const { productId } = req.params
    const searchProduct = await  productApi.getById(productId)
    return res.json( searchProduct);
};

const saveNewProduct = async (req, res) => {
    const idCount = await productApi.getAll()
    const { name, desc, image, price, stock} = req.body;
    if (!name || !desc || !image || !price || !stock ) return { error: 'Todos los campos son obligatorios!' };
    const newProduct = { 
        id: idCount.length +1,
        code: idCount.length +1,
        timestamp: Date.now(),
        name, desc, image, price, stock
    };
    productApi.save(newProduct)
    return res.json({response: `Se agregó el nuevo Producto: ${newProduct.id}`})
};

const updateProduct = (req,res)=>{
    const {productId} = req.params
    const {name,desc,price,image,stock} = req.body
    const newProduct = {name,desc,price,image,stock}

    if (!name || !desc || !image || !price || !stock) return res.json({ error: 'Todos los campos son obligatorios!' });

    const updatedProduct = productApi.updateById(productId, newProduct)
    return res.json({response: `Se actualizó el Producto: ${productId}`})
}
const deleteProduct = (req,res)=>{
    const {productId} = req.params
    const deletedProduct = productApi.deleteById(productId)
    if (deletedProduct.error) return res.status(404).send(deletedProduct.error);
  return res.json({Eliminado:deletedProduct});
};

module.exports = {
    productApi,
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
}
