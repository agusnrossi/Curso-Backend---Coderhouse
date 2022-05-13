const express=require('express');
const router=express.Router();
const viewRouter =express.Router();
const Product = require('../container/productContainer');
const faker = require('faker');

const product = new Product();

viewRouter.get('/productos/login', async (req, res) => {
    res.render("login")
});


viewRouter.get('/productos/vista', async (req, res) => {
    const listOfProducts = await product.getProducts();
    res.render("viewProduct.hbs", {
        productsExist: Array.isArray(listOfProducts),
        products: listOfProducts
    })
});

viewRouter.get('/productos/vista-test', async (req, res) => {
    console.log(req.query)
    const productsQuant = req.query.cant || 10;
    const fakerProducts = [];
    for(let i = 0; i<productsQuant;i++){
        fakerProducts.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        })
    }
    console.log(fakerProducts.length)
    await product.getProducts();
    res.render("viewProduct.hbs", {
        productsExist: fakerProducts.length > 0,
        products: fakerProducts
    })
})

router.get('/productos/listar', async (req, res) => {
    res.json(await product.getProducts())
});

router.get('/productos/listar/:id', async (req, res) => {
    res.json(await product.getProducts(req.params.id))
});

router.post('/productos/guardar', async (req, res) => {
    const product = req.body;   
    await product.addProduct(product);
    res.redirect('/')
});

router.put('/productos/actualizar/:id', async (req, res) => {
    const id = req.params.id;
    const updateData = { id: id, ...req.body };
    res.json(await product.updateProduct(updateData));
});

router.delete('/productos/borrar/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await product.deleteProduct(id));
});


module.exports = {viewRouter, router};