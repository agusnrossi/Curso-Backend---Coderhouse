const express = require('express');
const session = require('express-session');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));


app.get('/con-session', (req, res) => {
    if (req.session.contador) {
        req.session.contador++;
        res.send('Contador: ' + req.session.contador);
    } else {
        req.session.contador = 1;
        res.send('bienvenido');
    }

});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.send('logout');
        } else {
            res.send({ status: 'Logout fallido', body: err });
        }
    }
    );
}
);

app.get('/login', (req, res) => {
    const { username, password } = req.query
    if (username !== 'pepe' && password !== 'pepeas') {
        return res.send('Usuario o contraseña incorrectos');
    }
    req.session.username = username;
    req.session.admin = true;
    res.send('Bienvenido');


});


app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto ' + PORT);
});