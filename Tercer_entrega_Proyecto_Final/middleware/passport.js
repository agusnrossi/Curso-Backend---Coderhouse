const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const moment=require('moment');
const {newRegister}=require('../utils/nodemailer')
const {loggerInfo, loggerError}=require('../logger/index');
const userDao=require('../models/daos/User/userDao');
const { postNewCart } = require('../controller/cartController');
const usersDao=new userDao();


const salt=()=> bcrypt.genSaltSync(10);
const createHash=(password)=>bcrypt.hashSync(password,salt());
const isValidPassword=(user,password)=>bcrypt.compareSync(password,user.password);


passport.use("login",new LocalStrategy( async(username,password,done)=>{
    try{
        const user= await usersDao.getByEmail(username);
        if(!isValidPassword(user,password)){
            loggerError.error(`Wrong username or password`);
            return done(null,false,{message:"Wrong username or password"});
        }
        return done(null,user);
    }
    catch(error){
        loggerError.error(error);
        return done(null,false,{message:"Wrong username or password"});
    }
}))


passport.use("register",new LocalStrategy({passReqToCallback:true}, async(req,username,password,done)=>{
    try{
            const birthDayDate=req.body.bday
            const ageInYears = moment().diff(new Date(birthDayDate), 'years');

            const userObject={
                email:username,
                password:createHash(password),
                name:req.body.name,            
                phone:req.body.phone,
                bday:req.body.bday,
                age:ageInYears,
                address:req.body.address,
                image:req.file.path,
            }
            const user = await usersDao.createUser(userObject);
            const userWithCart = {...user._doc, cart: await postNewCart(user._id)}
            const reUser = await usersDao.updateById(user._id, userWithCart)
            infoLogger.info("User registration successful!");
            
            await newRegister(userObject)
            return done(null, user);
        }
        catch(error){
            loggerError.error(error);
            return done(null,false);
        }
}
))


passport.serializeUser((user,done)=>{
    done(null,user._id);
})


passport.deserializeUser(async(id,done)=>{
    const user= await usersDao.getById(id);
    done(null,user);
})


module.exports=passport;
