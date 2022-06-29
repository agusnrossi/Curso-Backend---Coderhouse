//---------Importing modules---------//
const express=require('express');
const session=require('express-session');
const MongoStore=require('connect-mongo')
const mongoose=require('mongoose');
const path=require('path');
const {engine}=require('express-handlebars');
const routes=require('./router/routes');


//---------Setting up express---------//

const PORT=8080 || process.env.PORT;

//-----Create the server------------------------//
const app=express();


//-----Set up the server to use static files-----//
app.use(express.static('views'));
app.use('/views',express.static(path.join(__dirname,'views')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));




//-----Set up the server to use handlebars-----//

app.engine('hbs',engine({
    extname:'hbs',
    layoutsDir:path.resolve(__dirname+'/views/layouts'),
    partialsDir:path.resolve(__dirname+'/views/partials')
}));
app.set('views','./views');
app.set('view engine','hbs');


//-----Set up the server to use the router-----//
app.use('/api',routes);

app.get('/',(req,res)=>{
    res.redirect('api/productos');
}
);


//-----Run the server------------------------//
const server=app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

server.on('error',(err)=>{
    console.log(err);
});
