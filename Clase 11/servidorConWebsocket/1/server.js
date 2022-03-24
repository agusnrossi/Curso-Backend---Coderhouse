const express=require('express');
const{Server:HttpServer}=require('http');   //para poder usar el servidor http
const {Server:IOServer}=require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));
app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname});
});

httpServer.listen(3000,()=>{
    console.log('Servidor corriendo en el puerto 3000');
});

io.on('connection',(socket)=>{
    console.log('Nuevo cliente conectado!!')
});