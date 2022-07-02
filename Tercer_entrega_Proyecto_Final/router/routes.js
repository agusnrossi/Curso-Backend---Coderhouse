
const express = require('express');
const router=express.Router();
const cartRouter=require('./cartRoute/cartRouter');
const productRouter=require('./productRoute/productRoute');
const fileRouter=require('./fileRoute/file.routes');
const authRouter=require('./auth/auth.routes');
const { loggerInfo, loggerError,loggerWarning } = require('../../logger/index');


const cartDao = require('../daos/Cart/cartDao');
const productDao = require('../daos/Products/productDao');



router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.use('/cart',cartRouter);
router.use('/productos',productRouter);
router.use('/file',fileRouter);
router.use('/auth',authRouter);


const cartsDao=new cartDao();
const productsDao=new productDao();


router.get('/',async (req,res)=>{
    try{
        const sessionName=req.user;
        const allProducts= await productsDao.getProducts();
        if(sessionName){
            const sessionCart=await cartsDao.getById(sessionName.cart)
            return res.render('index',{allProducts,sessionName,sessionCart});
        }

         
    }
    catch(error){
        loggerError.error(new Error(error));
    }
})


router.get('/logout',async (req,user)=>{
    const logoutName=req.user;
    req.logout()
    loggerInfo.info(`${logoutName.name} ha cerrado sesión`);
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
    loggerWarning.warn(`${method} ${router}`);
    res.status(404).render('index', { titleError: "404" , message: "PAGE NOT FOUND" });
}
);


module.exports=router;  

 