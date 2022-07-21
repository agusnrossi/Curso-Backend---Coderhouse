const express = require('express');
const authRoutes = require('./api/auth/auth.routes');
const infoRoutes = require('./api/info/info.routes');
const ProductsDao = require('../api/models/daos/products/products.mongo.dao')

const productsDao = new ProductsDao()
const router = express.Router()

router.use('/auth', authRoutes.initialize());
router.use('/info', infoRoutes);

router.get('/', async (req,res)=>{
    const sessionName = req.user
    const products = await productsDao.getAll()
    res.render('index', {products, sessionName})
})

router.get('/logout', (req,res)=>{
    const logoutName = req.user
    req.logout();
    console.log('User logued out!');
    res.render('index',{logoutName})

});

module.exports = router 