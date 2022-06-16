const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../container/userContainer');
const useR = new User();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

passport.use("login", new LocalStrategy(
    (req, email, password, done) => {
        console.log('iniciando sesion');
        try{
            const user=  useR.getByEmail(email);
            if(!isValidPassword(user, password)){
                return done(null, false, {message: "Contraseña incorrecta"});
            }
            return done(null, user);
        }
        catch(err){
            return done(null, false, {message: "Usuario no encontrado"});
        }
    }
));

passport.use("register", new LocalStrategy(
    { passReqToCallback: true }, 
    async (req, username, password, done) => {
      console.log('Ingresó a Register!')
      try {
        const usrObject= {
          email: username,
          password: createHash(password)
        }
        const user = await useR.createUser(usrObject);
        console.log("User registration successful!");
        return done(null, user);
      }
      catch(error) {
        return done(null, false);
      }
    }
  ));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Inside deserializer')
    const user = await useR.getByEmail(id);
    done(null, user);
  })
  

module.exports = passport;

