const express = require('express');
const router = express.Router();
const { viewRouter } = require('./routes/productRoute');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Products = require('./container/productContainer');
const Messages = require('./container/messageContainer');
const messages =new Messages();
const products = new Products();
const mongoose = require('mongoose');

//---------------------------------------------//
const app = express();
const PORT = 8080;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//-------------------------------------------//
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/', router);
app.use(viewRouter);


//-------------------------------------------------------//
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('conexion exitosa!'))
    .catch(err => console.log(err))
//-------------------------------------------------------------------//

io.on('connection', socket => {

    

    console.log('Client connected...');
    socket.emit('product', products.getProducts());
    socket.emit('messages',messages.getMessage());

    socket.on('update', async(data) => {
        io.sockets.emit('update', await products.getProducts());
    }
    );
    socket.on('message', message => {
        console.log(message);
        messages.addMessage(message);
        io.emit('message', message);
    }
    );

    socket.on('getMessages', () => {
        messages.getMessage().then(messages => {
            io.emit('getMessages', messages);
        }
        );
    }
    );

    socket.on('getProducts', () => {
        products.getProducts().then(products => {
            io.emit('getProducts', products);
        }
        );
    }
    );
    socket.on('getProduct', id => {
        products.getProduct(id).then(product => {
            io.emit('getProduct', product);
        }
        );
    }
    );

});



io.on('connection', socket=>{
    console.log('Client connected');
    socket.emit('messages', messages.getMessage())
    socket.on('message', (message) => {
        messages.addMessage(message)
        io.emit('messages', messages.getMessage())
    })

    socket.on('new-message', async (mssg) => {
        mssg.fyh = new Date().toLocaleString()
        await messages.addMessage(mssg);
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

