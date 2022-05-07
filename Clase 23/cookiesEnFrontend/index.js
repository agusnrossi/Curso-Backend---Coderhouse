const express = require('express');
const cookieParser = require('cookie-parser');

const app= express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));   



app.post('/cookies',(req,res)=>{
    if(req.body.time ==undefined){
    res.cookie(req.body.nombre, req.body.valor  ).send({proceso: 'ok'})

    }else{
        res.cookie(req.body.nombre, req.body.valor,{maxAge: req.body.time}).send({proceso: 'ok'})
}
})


app.get('/get',(req,res)=>{
    res.send(req.cookies)
})


app.delete('/delete',(req,res)=>{
    res.clearCookie(req.query.nombre).send('cookie delete')
}
)

app.listen(3000,()=>{
    console.log('server on port 3000')
}
)