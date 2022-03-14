const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT=8080;



const server=app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

server.on('error',(err)=>{
    console.log(err);
});



app.set('view engine','ejs');
const personas=[{nombre:"juan",apellido:"perez",edad:20}];

app.get("/personas",(req,res)=>{
    res.render("formulario",{personas});
})

app.post('/personas',(req,res)=>{
    personas.push(req.body);
    res.render("formulario",{personas});   
})