<<<<<<< HEAD
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('./routers/auth/passport');
const path = require('path');
const {engine} = require('express-handlebars');
const apiRoutes = require('./routers/routes')
const dbConfig=require('./utils/dbConfig');
const {infoLogger, errorLogger, consoleLogger} = require('./utils/logger/index')
=======
//---------Importing modules---------//
require('dotenv').config();
const express=require('express');
const session=require('express-session');
const  MongoStore = require('connect-mongo')
const mongoose=require('mongoose');
const path=require('path');
const {loggerConsole, loggerInfo, loggerError} = require('./logger/index');
const dbConfig=require('./config/config.js');
const apiRouter=require('./router/routes')
const passport=require ('passport')
>>>>>>> 8031afd8eff374b5f54386c1c8c5b71091384847

const minimist = require('minimist')
const cluster = require('cluster')
const os = require('os');

const PORT = process.env.PORT || 8080;

const args = minimist(process.argv.slice(2), {
    default:{
        MODE: 'FORK'
    },
    alias:{
        m:'MODE'
    }
})

if(args.MODE =='CLUSTER'){
    if(cluster.isPrimary){
        infoLogger.info(`Proceso principal, N°: ${process.pid}`)
        const CPUS_NUM = os.cpus().length;
        for(let i = 0; i< CPUS_NUM;i++){
            cluster.fork()
        }
    }else{
        infoLogger.info(`Proceso secundario, N°: ${process.pid}`)
        allServer();
    }
}else{
    allServer();
}

function allServer(){
    //Server
    const app = express();

    //middlewares
    app.use(express.static('views'));
    app.use('/views', express.static(__dirname + '/views'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(session({
        name:'coder-session',
        secret:process.env.COOKIE_SECRET,
        resave:false,
        saveUninitialized: false,
        cookie:{maxAge:24 * 60 * 60 * 1000},
        store: MongoStore.create({
            mongoUrl:'mongodb+srv://agusnrossi:Tottenham@cluster0.yrwhz.mongodb.net/ecommerce?retryWrites=true&w=majority', 
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    })}));
    
    app.use(passport.initialize());
    app.use(passport.session());

    //Template Engines
    app.engine('hbs', engine({
        extname:'hbs',
        layoutsDir:path.resolve(__dirname,"./views/layouts"),
        partialDir:path.resolve(__dirname, "./views/partials")
    }))
    app.set('views', './views/');
    app.set('view engine', 'hbs');

    //Routes
    app.use(apiRoutes);

<<<<<<< HEAD
    //Inicio de Server
    app.listen(PORT, ()=>{
        mongoose.connect('mongodb+srv://agusnrossi:Tottenham@cluster0.yrwhz.mongodb.net/ecommerce?retryWrites=true&w=majority')
    .then(() => {
        infoLogger.info('Connected to DB!');
        consoleLogger.info('Server is up and running on port:', PORT);
    })
    .catch(err => {
        errorLogger.error(`An error occurred while connecting the database`);
        errorLogger.error(`Error en servidor `, err);
        })
    });
}
=======
//-----Set up the server to use static files-----//
app.use(express.static('views'));
app.use('/views',express.static(path.join(__dirname,'views')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    name:'coder-session',
    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized: false,
    cookie:{maxAge:24 * 60 * 60 * 1000},
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://agusnrossi:Tottenham@cluster0.yrwhz.mongodb.net/ecommerce?retryWrites=true&w=majority', 
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
})}));
app.use(passport.initialize());
app.use(passport.session());



//-----Set up the server to use handlebars-----//

const {engine}=require('express-handlebars');
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.resolve(__dirname, "./views/layouts"),
    partialDir: path.resolve(__dirname, "./views/partials")
}))

app.set('view engine', 'hbs')
const viewPath = path.join(__dirname, "./views");

app.set('views', viewPath);


//-----Set up the server to use the router-----//
app.use(apiRouter);


//-----Connect to database---------//


mongoose.connect('mongodb+srv://agusnrossi:Tottenham@cluster0.yrwhz.mongodb.net/ecommerce?retryWrites=true&w=majority')
.then(() => console.log('conexion exitosa!'))
.catch(err => console.log(err))


//-----Run the server------------------------//
const server=app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
server.on('error',(err)=>{
    console.log(err);
})
}
>>>>>>> 8031afd8eff374b5f54386c1c8c5b71091384847
