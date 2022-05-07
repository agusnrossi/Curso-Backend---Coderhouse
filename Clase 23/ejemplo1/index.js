const express = require('express');
const cookieParser = require('cookie-parser');

const app= express();
app.use(cookieParser());

app.get('/set',(req,res)=>{
    res.cookie('server','express').send('cookie set');
})

app.get('/setEX',(req,res)=>{
     res.cookie('server2','express2',{maxAge:3000}).send('cookie setEX');})

app.get('/get',(req,res)=>{
    res.send(req.cookies.server)
})

app.get('/Clr',(req,res)=>{
    res.clearCookie('server').send('cookie clear')
}
)


app.listen(3000,()=>{
    console.log('server on port 3000')
}
)
