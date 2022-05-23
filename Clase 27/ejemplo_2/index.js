const yargs = require('yargs/yargs')(process.argv.slice(2));
const argv = yargs

.default({
    nombre:'pepe',
    apellido:'perez',

})
.argv

console.log(argv);