const express = require('express');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Products = require('./container/productContainer');
const Messages = require('./container/messageContainer');
const messages =new Messages('message.json');
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

io.on('connection', socket => {
    console.log('Client connected');
    socket.emit('productos', products.getProducts())
    socket.on('update', (product) => {
        products.insertProduct(product)
        io.emit('productos', products.getProducts())
    })
});



io.on('connection', socket=>{
    console.log('Client connected');
    socket.emit('messages', messages.getMessages())
    socket.on('message', (message) => {
        messages.insertMessage(message)
        io.emit('messages', messages.getMessages())
    })

    socket.on('new-message', async (mssg) => {
        mssg.fyh = new Date().toLocaleString()
        await messages.saveMessage(mssg);
        io.sockets.emit('messages', messages.getMessage());
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

