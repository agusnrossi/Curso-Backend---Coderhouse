//---------Importing modules---------//
require('dotenv').config();
const express=require('express');
const session=require('express-session');
const MongoStore=require('connect-mongo')
const mongoose=require('mongoose');
const path=require('path');
const {engine}=require('express-handlebars');
const {loggerConsole, loggerInfo, loggerError} = require('./logger/index');
const dbConfig=require('./config/config.js');
const apiRouter=require('./router/routes')

const minimist =require('minimist')
const cluster=require('cluster')
const os = require('os')

//---------Setting up express---------//

const PORT=8080 || process.env.PORT;

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


//-----Create the server------------------------//
const app=express();


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
        mongoUrl: 'mongodb+srv://agusnrossi:Tottenham@cluster0.yrwhz.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
})}));
app.use(passport.initialize());
app.use(passport.session());



//-----Set up the server to use handlebars-----//

app.engine('hbs',engine({
    extname:'hbs',
    layoutsDir:path.resolve(__dirname+'/views/layouts'),
    partialsDir:path.resolve(__dirname+'/views/partials')
}));
app.set('views','./views');
app.set('view engine','hbs');


//-----Set up the server to use the router-----//
app.use(apiRouter);

//-----Run the server------------------------//
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
.then(()=>{
    loggerInfo.info(`Server is running on port ${PORT}`);
    loggerConsole.info(`Server is running on port ${PORT}`);
}
)
.catch(error=>{
    loggerError.error(`Server is running on port ${PORT}`);
})

}
