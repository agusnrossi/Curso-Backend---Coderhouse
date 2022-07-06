require('dotenv').config();
const express = require('express');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Products = require('./api/container/productContainer');
const Messages = require('./api/container/messageContainer');
const messages = new Messages();
const products = new Products();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')

const minimist = require('minimist');
const cluster = require('cluster');
const os = require('os')

const HOST = process.env.HOST ||'0.0.0.0';
const PORT = process.env.PORT || 8080
//-----------------------------------------------------//
const args = minimist(process.argv.slice(2), {
    default: {
        PORT: 8080,
        MODE: 'FORK'
    },
    alias: {
        p: 'PORT',
        m: 'MODE'
    }
}
)


//-----------------------------------------------------//

if (args.MODE === 'CLUSTER' && cluster.isPrimary) {
    console.log(`Proceso principal, N°: ${process.pid}`)

    const CPUS_NUM = os.cpus().length;
    console.log(`Número de CPUs: ${os.cpus().length}`)
    for (let i = 0; i < CPUS_NUM; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker) => {
        console.log(`Proceso ${worker.process.pid} terminado  ${new Date().toLocaleString()}`)
        cluster.fork()
    })
} else {
    console.log(`Proceso secundario, N°: ${process.pid}`)

    
    const apiRoutes = require('./router/index.routes');
    const passport = require('./api/middlewares/passport')
   
    const app = express();
    const httpServer = new HttpServer(app);
    const io = new IOServer(httpServer);

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
    const { engine } = require('express-handlebars')

    app.engine('hbs', engine({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: path.resolve(__dirname, "./views/layouts"),
        partialDir: path.resolve(__dirname, "./views/partials")
    }))

    app.set('view engine', 'hbs')
    const viewPath = path.join(__dirname, "./views");

    app.set('views', viewPath);



    app.use(apiRoutes);


    //-----------------------------------------------------//

    mongoose.connect('mongodb+srv://agusnrossi:Tottenham@cluster0.yrwhz.mongodb.net/ecommerce?retryWrites=true&w=majority')
        .then(() => console.log('conexion exitosa!'))
        .catch(err => console.log(err))

    //-----------------------------------------------------//



   

    io.on('connection', async (socket) => {

        const arrayMsg = await messages.getMessage();

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



    const server = httpServer.listen(PORT, HOST, () => {
        console.log(`Server is running on port ${PORT} and the server is ${HOST}`);
    })

    server.on('error', (err) => {
        console.log(err)
    })
}

//------------------------------------------------------------------//
