import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import hbs from 'express-handlebars'

const app = express();

app.set('view', './src/views');
app.engine('.hbs', hbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: './src/views/layouts'
}));

app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser())
app.use(session({
    secret:'secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:2000}
}))


//rutas


app.get('/login', (req, res) => {
    res.render('login')
})


//servidor

app.listen(8080,()=>{
    console.log('servidor corriendo en el puerto 8080')
})
