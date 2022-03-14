const express=require('express');
const router = require("./routes/router");
const handlebars=require('express-handlebars');

//---------------------------------------------//
const app=express();
const PORT=8080

//-------------------------------------------//
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use("/", router);

//-------------------------------------------------------//
app.engine('hbs',handlebars({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    }))

//-------------------------------------------------------//
app.set('view engine','hbs')
app.set('views','./views')

//-------------------------------------------------------------------//
const server=app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

server.on('error',(err)=>{
    console.log(err)
})

//------------------------------------------------------------------//

