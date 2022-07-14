const {infoLogger} = require('../utils/logger');

const middleLogger = (req, res, next) => {
    const router = req.url;
    const method = req.method;
    infoLogger.info(`Method: ${method}  -- Router: ${router}`);
    next();
}

module.exports = {  middleLogger };