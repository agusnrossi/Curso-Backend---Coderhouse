const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const FileStore= require('session-file-store')(session);


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
    store: new FileStore({ path: '../sessions', ttl: 1000, retries: 0 }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

app.get('/login', (req, res) => {
    const { username} = req.query
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
    console.log('Servidor iniciado en el puerto ' + PORT);
});