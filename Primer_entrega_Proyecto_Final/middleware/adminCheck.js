const isAdmin=true;

const adminChecker=(req,res,next)=>{
    if(isAdmin){
        next();
    }else{
        res.send({ error : -1, descripcion: "ruta 'x' método 'y' no autorizada"});
    }
}

module.exports={adminChecker};