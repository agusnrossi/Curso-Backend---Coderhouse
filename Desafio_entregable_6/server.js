const express = require('express');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Products = require("./api/productos");
const products = new Products();
//---------------------------------------------//
const app = express();
const PORT = 8080;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//-------------------------------------------//
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


//-------------------------------------------------------//

//-------------------------------------------------------------------//


io.on('connection', async socket => {
    console.log('¡Nuevo cliente conectado!');

    socket.emit('productos', products.getProducts());

    socket.on('update', product => {
        products.saveProducts(product);
        io.sockets.emit('productos', products.getProducts());
    })

});

let messages = [];

io.on('connection', function (socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages)

    socket.on('new-message', function (data) {
        data.fyh = new Date().toLocaleString()
        messages.push(data);
        io.sockets.emit('messages', messages);
        console.log(messages);
    });


});



//----------------------------------------------------------//



const server = httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

server.on('error', (err) => {
    console.log(err)
})

//------------------------------------------------------------------//

