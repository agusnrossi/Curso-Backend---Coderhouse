const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

/*----------------------------------*/
/*        PERSISTENCIA POR MONGO DB */
/*----------------------------------*/
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

/*----------------------------------*/
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    /*----------------------------------*/
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://agusnrossi:Tottenham31@cluster0.yrwhz.mongodb.net/sesiones?retryWrites=true&w=majority',
        mongoOptions:advancedOptions
    }),
    /*----------------------------------*/
    secret:'secreto',
    resave: true,
    saveUninitialized: true
}));
    

app.get('/login', (req, res) => {
    const  username = req.query
    req.session.user=username;
    if(username ==='pepe') {
    req.session.admin = true;
    }
    res.send('Bienvenido');
});

function auth(req, res, next) {
    if(req.session?.user ==='pepe' && req.session?.admin) {
        return next();
    }
    return res.status(401).send('No autorizado');
}

app.get('/privado',(req, res) => {
    res.send('ya estas logueado')
}
);

app.get('/reiniciar',(req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.send('logout ok!!');
            } else {
                res.send({ status: 'Logout fallido', body: err });
                }
            }
        );
}
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})