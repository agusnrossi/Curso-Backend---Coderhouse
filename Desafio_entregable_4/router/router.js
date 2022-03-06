const express = require("express");
const router = express.Router();

const Products = require("../api/productos");
const products = new Products();

router.post("/save", (req, res) => {
  products.saveProducts(req.body.title, req.body.price, req.body.thumbnail);
  res.json({ status: "ok" });
});

router.get("/show", (req, res) => {
  let show = products.getProducts();
  if (show.length === 0) {
    res.json({
      message: "There are no products",
    });
  } else {
    return res.json({
      message: "Products",
      products: show,
    });
  }
});

router.get("/show/:id", (req, res) => {
  let id = req.params.id;
  let product = products.getById(id);
  if (product === null) {
    res.json({
      message: "Product not found",
    });
  } else {
    res.json(product);
  }
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  let product = products.getById(id);
  if (product === null) {
    res.json({
      message: "Product not found",
    });
  } else {
    product.title = req.body.title;
    product.price = req.body.price;
    product.thumbnail = req.body.thumbnail;
    res.json({
      message: "Product has been updated",
      product: product,
    });
  }
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  let product = products.getById(id);
  if (product === null) {
    res.json({
      message: "Product not found",
    });
  } else {
    products.deleteProduct(id);
    res.json({
      message: "Product has been deleted",
    });
  }
});

module.exports = router;
