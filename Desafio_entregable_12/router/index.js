const express=require('express')
const apiRoutes=require('./api/api.Routes')
const router=express.Router()

router.use('/api',apiRoutes)

router.get('/', async (req,res)=>{
    const sessionName = req.user
    
    res.render('index', { sessionName})
})
/*
router.post('/', (req, res) => {
    req.session.userEmail = req.body.userEmail;
    req.session.save(() => {
        res.redirect('/')
    })
})

*/
router.get('/logout', (req, res) => {
    const logoutName = req.user
    req.logout();
    console.log('logout');
    res.render('index', { logoutName })
}
)

router.get('/register-error', (req, res) => {
    res.render('index', { titleError: "register-error" , message: "USER ERROR SIGNUP" });
});
router.get('/login-error', (req, res) => {
    res.render('index', { titleError: "login-error" , message: "USER ERROR LOGIN" });
});


router.get('/info', (req,res)=>{
    const info = {
        inputArguments: JSON.stringify(args),
        platformName:   process.platform,
        versionNode:    process.version,
        rss:            process.memoryUsage().rss,
        path:           process.argv[0],
        processId:      process.pid,
        projectFolder:  `${process.cwd()}`
    }
    res.render('index', {info})
});


module.exports=router;