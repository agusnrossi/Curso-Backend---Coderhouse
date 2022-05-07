const express = require('express');
const session = require('express-session');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));


app.get('/root', (req, res) => {
    if (!req.session.nombre) {
        req.query.nombre? 
        req.session.nombre = req.query.nombre
            :req.session.nombre = 'Anonimo';

    }
    if (req.session.contador) {
        req.session.contador++;
        res.send(`${req.session.nombre} tiene ${req.session.contador} visitas`)

    } else {
        req.session.contador = 1;
        res.send(`Bienvenido ${req.session.nombre}`)
    }
}
)

app.get('/Logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.send('logout')
        } else {
            res.send({ status: 'Logout fallido', body: err })
        }
    }
    )
}
)

app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto ' + PORT);
});



//-------------------------------------------------------//
