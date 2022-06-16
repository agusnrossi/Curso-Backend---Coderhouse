const { info } = require('console');
const {logger,consoleLogger,infoLogger,warningLogger,errorLogger}=require('../utils/logger/index');

const middleLogger=(req,res,next)=>{
    const router=req.url;
    const method=req.method;
    infoLogger.info(`Method:${method} -- Router: ${router}`);
    next();
}

module.exports={
    middleLogger
}