const parseArgs = require('minimist');
const options={ default:{ modo:'prod', puerto:8080, debug:false  } };

console.log(parseArgs(process.argv, options))
