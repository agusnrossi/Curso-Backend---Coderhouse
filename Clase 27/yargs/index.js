const yargs = require('yargs/yargs')(process.argv.slice(2));
const argv = yargs

.alias({
    m:'modo',
    p:'puerto',
    d:'debug'
})
.argv

console.log(yargs.argv)