import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import hbs from 'express-handlebars';
import passport from 'passport'
import {Strategy} from 'passport-local'

const localStrategy = Strategy

const app = express();
app.use(passport.initialize())
app.use(passport.session())


//passport

passport.use('login',new localStrategy((username,password,done)=>{
    const exist = usuarios.find(usuario=>{
        return usuario.nombre===username && usuario.password===password
        })
        if(!exist){
            return done(null,false)
        }else{
            return done(null,exist)
        }
}))

passport.serializeUser((usuario,done)=>{
    done(null,usuario.nombre)
})

passport.deserializeUser((nombre,done)=>{
    const usuarioDz=usuarios.find(usuario =>{usuario.nombre===nombre})
    done(null,usuarioDz)
})



app.set('views', './src/views');
app.engine('.hbs', hbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: './src/views/layouts'
}));

app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//BD
const usuarios=[];

//session

app.use(cookieParser())
app.use(session({
    secret:'secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:2000}
}))


//rutas

app.get('/registro', (req, res) => {
    res.render('register')
})

app.post('/registrar',(req,res)=>{
    const {nombre,password,direccion}=req.body;
    if(usuarios.find(usuario=>{ return usuario.nombre===nombre})){
        res.render('register-error')
    }else{
        usuarios.push({nombre,password,direccion})
        console.log(usuarios)
        res.render('login')
    }
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login',passport.authenticate('login',{
    successRedirect:'/datos',
    failureRedirect:'/login-error'
})
)
  
app.get('/datos',isLoggedIn ,(req, res) => {
    const {nombre,direccion} = req.session;
    res.send({nombre})
})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.render('login')
})


function isLoggedIn(req,res,next){
    if(req.session.nombre){
        next()
    }else{
        res.redirect('/login')
    }
}


//servidor

app.listen(8080,()=>{
    console.log('servidor corriendo en el puerto 8080')
})
