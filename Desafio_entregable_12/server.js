require('dotenv').config();
const express = require('express');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Products = require('./container/productContainer');
const Messages = require('./container/messageContainer');
const messages = new Messages();
const products = new Products();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const apiRoutes = require('./router/index');
const minimist = require('minimist');
const passport=require('./middlewares/passport')


//-----------------------------------------------------//

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const args = minimist(process.argv.slice(2), {
    default:{
        PORT: 8080,
    },
    alias:{
        p:'PORT'
    }
})
//-----------------------------------------------------//


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'));

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://agusnrossi:Tottenham@cluster0.yrwhz.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600
    })
}))
app.use(passport.initialize());
app.use(passport.session());

//----------------- configurar motor handlebars------------------------------------//
const  {engine} = require('express-handlebars')

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.resolve(__dirname, "./views/layouts"),
    partialDir: path.resolve(__dirname, "./views/partials")
}))

app.set('view engine', 'hbs')
const viewPath = path.join(__dirname, "./views");
console.log(viewPath);
app.set('views', viewPath);


app.use(apiRoutes);



//-----------------------------------------------------//

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conexion exitosa!'))
    .catch(err => console.log(err))

//-----------------------------------------------------//



io.on('connection', async (socket) => {

    //const arrayMsg = await messages.getMessage();

    console.log('Client connected...');
    socket.emit('product', await products.getProducts());
    socket.emit('messages', await messages.getMessage());

    socket.on('update', async (data) => {
        io.sockets.emit('update', await products.getProducts());
    }
    );


    socket.on('new-message', async (data) => {
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
    console.log('Server is running on port ', PORT)
})

server.on('error', (err) => {
    console.log(err)
})

//------------------------------------------------------------------//
