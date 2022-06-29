const {logger, loggerConsole, loggerInfo, loggerError, loggerWarning} = require('../logger/index');

const middleLogger = (req, res, next) => {
    const router=req.originalUrl;
    const method=req.method;
    const body=req.body;
    const params=req.params;
    const query=req.query;
    const ip=req.ip;
    const user=req.user;
    const date=new Date();

    loggerInfo.info(`${date} - ${ip} - ${method} - ${router} - ${body} - ${params} - ${query} - ${user}`);
    next();
}


module.exports = {
    middleLogger
}
