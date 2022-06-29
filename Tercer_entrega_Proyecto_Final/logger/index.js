const log4js = require('log4js');
const path = require('path');


log4js.configure({
    appenders: {
        console: { type: 'console' },
        infoFile:{type:'file', filename: path.join(__dirname, '../../logs/info.log')},
        errorsFile:{type:'file', filename: path.join(__dirname, '../../logs/error.log')},
        warningFile:{type:'file', filename: path.join(__dirname, '../../logs/warn.log')},
    },
    categories: {
        default: { appenders: ['console', ], level: 'trace' },
        infoFile: { appenders: ['infoFile', ], level: 'info' },
        error: { appenders: ['console','errorsFile', ], level: 'error' },
        warningFile: { appenders: ['warningFile', ], level: 'warn' },
    }
});


const logger = log4js.getLogger();
const loggerConsole = log4js.getLogger('console');
const loggerInfo = log4js.getLogger('infoFile');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warningFile');


module.exports = {
    logger,
    loggerConsole,
    loggerInfo,
    loggerError,
    loggerWarning
}