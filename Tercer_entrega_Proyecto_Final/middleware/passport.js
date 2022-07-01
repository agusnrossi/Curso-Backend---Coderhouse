const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const moment=require('moment');
const {infoLogger,errorLogger}=require('../../logger/index');
const userDao=require('../daos/User/userDao');
const { postNewCart } = require('../controller/cartController');
const userDao=new userDao();


const salt=()=> bcrypt.genSaltSync(10);
const createHash=(password)=>bcrypt.hashSync(password,salt());
const isValidPassword=(user,password)=>bcrypt.compareSync(password,user.password);


passport.use("login",new LocalStrategy( async(username,password,done)=>{
    try{
        const user= await userDao.getByEmail(username);
        if(!isValidPassword(user,password)){
            errorLogger.error(`Wrong username or password`);
            return done(null,false,{message:"Wrong username or password"});
        }
        return done(null,user);
    }
    catch(error){
        errorLogger.error(error);
        return done(null,false,{message:"Wrong username or password"});
    }
}))


passport.use("register",new LocalStrategy({passReqToCallback:true}, async(username,password,done)=>{
    try{
            const bday=req.body.bday
            const ageInYears=moment().diff(bday,'years');

            const userObject={
                email:username,
                password:createHash(password),
                name:req.body.name,
                lastName:req.body.lastName,
                phone:req.body.phone,
                bday:req.body.bday,
                ageInYears:ageInYears,
                address:req.body.address,
                Image:req.file.path,
            }

            const user= await userDao.createUser(userObject);
            const userWithCart={...user._doc,cart:await postNewCart(user._id)}
            const reUser= await userDao.updateById(user._id,userWithCart);
            infoLogger.info("registration successful");

            await newRegister(userObject)
            return done(null,user);
        }
        catch(error){
            errorLogger.error(error);
            return done(null,false,{message:"Wrong username or password"});
        }
}
))


passport.serializeUser((user,done)=>{
    done(null,user._id);
})


passport.deserializeUser(async(id,done)=>{
    const user= await userDao.getById(id);
    done(null,user);
})


Module.exports=passport;
