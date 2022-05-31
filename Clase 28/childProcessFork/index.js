const express=require('express');
const {fork}=require('child_process');


const app=express();


app.listen(3000,()=>{
    console.log('Escuchando en el puerto 3000');
});

let visitas=0;

app.get('/visitas',(req,res)=>{ 
    visitas++;

    res.send(`${visitas}`)
})

/* app.get('/calculo', (req,res)=>{
    let suma=0
    for(let i=0;i<6e9;i++){
        suma+=i
    }
    res.send(`suma: ${suma}`)
}) */  

app.get('/calculo', (req,res)=>{
    const forked = fork('./suma.js')
    forked.send('start');
    forked.on('message',(suma)=>{
        res.send(`suma: ${suma}`)
    })
})
