
const express = require('express');
const router=express.Router();
const cartRouter=require('./cartRoute/cartRouter');
const productRouter=require('./productRoute/productRoute');
const fileRouter=require('./fileRoute/file.routes');
const authRouter=require('./auth/auth.routes');
const { infoLogger, errorLogger } = require('../../logger/index');


const cartDao = require('../daos/Cart/cartDao');
const productDao = require('../daos/Products/productDao');
const { route } = require('./cartRoute/cartRouter');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.use('/cart',cartRouter);
router.use('/productos',productRouter);
router.use('/file',fileRouter);
router.use('/auth',authRouter);


const cartDao=new cartDao();
const productDao=new productDao();


router.get('/',async (req,res)=>{
    try{
        const sessionName=req.user;
        const allProducts= await productDao.getProducts();
        if(sessionName){
            const sessionCart=await cartDao.getById(sessionName.cart)
            return res.render('index',{allProducts,sessionName,sessionCart});
        }

         
    }
    catch(error){
        errorLogger.error(new Error(error));
    }
})


router.get('/logout',async (req,user)=>{
    const logoutName=req.user;
    req.logout()
    infoLogger.info(`${logoutName.name} ha cerrado sesión`);
    res.render('index',{logoutName});
})

router,get('/login',async (req,res)=>{
    res.render('login');
})  

router.get('/register-error', (req, res) => {
    res.render('index', { titleError: "register-error" , message: "USER ERROR SIGNUP" });
});
router.get('/login-error', (req, res) => {
    res.render('index', { titleError: "login-error" , message: "USER ERROR LOGIN" });
});

router.get('/*', (req, res) => {
    const router=req.url;
    const method = req.method;
    warnLogger.warn(`${method} ${router}`);
    res.status(404).render('index', { titleError: "404" , message: "PAGE NOT FOUND" });
}
);


module.exports=router;  

 