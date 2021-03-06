const express = require('express');
const router = express.Router();
const { viewRouter } = require('./routes/productRoute');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const hbs = require('express-handlebars');
const Products = require('./container/productContainer');
const Messages = require('./container/messageContainer');
const messages = new Messages();
const products = new Products();
const mongoose = require('mongoose');

//---------------------------------------------//
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//-------------------------------------------//
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/', router);
app.use(viewRouter);

app.engine('hbs', hbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');


//-------------------------------------------------------//
mongoose.connect('mongodb://0.0.0.0:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conexion exitosa!'))
    .catch(err => console.log(err))
//-------------------------------------------------------------------//

io.on('connection', async (socket) => {

    const arrayMsg = await messages.getMessage();

    console.log('Client connected...');
    socket.emit('product', await products.getProducts());
    socket.emit('messages', await messages.getMessage());

    socket.on('update', async (data) => {
        io.sockets.emit('update', await products.getProducts());
    }
    );


    socket.on('new-message',async (data) => {
        console.log('data', data)
        const newMssg = messages.addMessage(data);
        io.sockets.emit('messages', messages.getMessage());
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


//----------------------------------------------------------//



const server = httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

server.on('error', (err) => {
    console.log(err)
})

//------------------------------------------------------------------//

