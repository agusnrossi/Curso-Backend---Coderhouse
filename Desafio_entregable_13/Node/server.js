require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Products = require('./container/productContainer');
const Messages = require('./container/messageContainer');
const messages = new Messages();
const products = new Products();
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')
const apiRoutes = require('./router/api/apiRoutes');
const minimist = require('minimist');
const os = require('os')


//-----------------------------------------------------//

const app = express();
const PORT = process.argv[2];
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

app.use('/api', apiRoutes);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'));
//app.use('/api/', router);
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
   // store: mongoStore.create({mongoUrl:'//0.0.0.0:27017/ecommerce'})
}))

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






//-----------------------------------------------------//

mongoose.connect('mongodb://0.0.0.0:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conexion exitosa!'))
    .catch(err => console.log(err))

//-----------------------------------------------------//



app.get('/', (req, res) => {

    const sessionName = req.user

    res.render('index', {
        sessionName
    })
})

app.post('/', (req, res) => {
    req.session.userEmail = req.body.userEmail;
    req.session.save(() => {
        res.redirect('/')
    })
})
app.get('/logout', (req, res) => {
    const logoutName = req.session.user
    req.logout();
    console.log('logout');
    res.render('index', { logoutName })
}
)

app.get('/register-error', (req, res) => {
    res.render('index', { titleError: "register-error" , message: "USER ERROR SIGNUP" });
});
app.get('/login-error', (req, res) => {
    res.render('index', { titleError: "login-error" , message: "USER ERROR LOGIN" });
});


app.get('/info', (req,res)=>{
    const info = {
        inputArguments: JSON.stringify(args),
        platformName:   process.platform,
        versionNode:    process.version,
        rss:            process.memoryUsage().rss,
        path:           process.argv[0],
        processId:      process.pid,
        projectFolder:  `${process.cwd()}`
    }
    res.render('index', {info})
});


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



const server = httpServer.listen(args.PORT, () => {
    console.log(`Server is running on port ${args.PORT}`)
})

server.on('error', (err) => {
    console.log(err)
})

//------------------------------------------------------------------//
