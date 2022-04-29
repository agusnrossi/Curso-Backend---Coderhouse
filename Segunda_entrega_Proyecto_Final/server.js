//---------Importing modules---------//
const express=require('express');
const routes=require('./router/routes');



//-----Create the server------------------------//
const app=express();
const PORT=8080 || process.env.PORT;

//-----Set up the server to use static files-----//
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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
