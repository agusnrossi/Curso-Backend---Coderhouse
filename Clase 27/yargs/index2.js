const yargs = require('yargs/yargs')(process.argv.slice(2));
const argv = yargs

.default({
   modo:'prod',
   puerto:8080,
   debug:false
})
.argv

console.log(yargs.argv)