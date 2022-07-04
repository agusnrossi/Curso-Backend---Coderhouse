const isAdmin=true;

const adminChecker=(req,res,next)=>{
    if(isAdmin){
        next();
    }else{
        res.send({ error : -1, descripcion: `Ruta ${req.path} ,Método ${req.method} no AUTORIZADA` })
    }
}

module.exports={adminChecker};