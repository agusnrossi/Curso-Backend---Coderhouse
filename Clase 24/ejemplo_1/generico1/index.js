const express=require('express');
const cookieParser=require('cookie-parser');
const session=require('express-session');


/*-------------------------------------------*/
/*          PERSISTENCIA POR FILE STORE      */
/*-------------------------------------------*/

const FileStore=require('session-file-store')(session);

/*--------------------------------------------------*/

const app=express();
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({

/*-------------------------------------------*/
/*          PERSISTENCIA POR FILE STORE      */
/*-------------------------------------------*/

store : new FileStore({path:'../sessions',ttl:3600,retries:0}),

/*--------------------------------------------------*/

secret:'shhhhhhhhhhh',
resave:false,
saveUninitialized:false,/*
cookie:{
    maxAge:4000
}
*/
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


app.listen(8080,()=>{
    console.log('Servidor iniciado en el puerto 8080');
}
);
