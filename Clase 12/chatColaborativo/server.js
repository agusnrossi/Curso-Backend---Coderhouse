const express = require('express');
const { Server: HttpServer } = require('http');   //para poder usar el servidor http
const { Server: IOServer } = require('socket.io');

const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});


httpServer.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 3000');
});


const messages = [{ author: "Juan", text: "¡Hola! ¿Que tal?" },
 { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
  { author: "Ana", text: "¡Genial!" }
];


io.on('connection',(socket)=>{
    console.log('Usuario conectado');
    socket.emit('messages',messages);

    
    socket.on('new-message',data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });


    });
   
