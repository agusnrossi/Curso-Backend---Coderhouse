const express = require("express");
const router = express.Router();
const Products = require("../api/productos");
const products = new Products();

//----------------------------------------------------------------------//
router.post('/productos', (req, res) => {
  products.saveProducts(req.body)
  res.redirect('/');
})  

router.get('/productos', (req, res) => {
  const prods = products.getProducts()

  if (prods.length > 0) {
    res.render('viewProduct', { productos: prods, productsExists: true })
  } else {
    res.render('viewProduct', { productos: prods, productsExists: false })
  }
})

//----------------------------------------------------------------------//
module.exports = router;
