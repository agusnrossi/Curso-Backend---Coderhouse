const parseArgs = require('minimist');
const args = parseArgs(process.argv);

const options = {
    alias: {
        p:'puerto',
        d: 'debug',
        m:'modo'
    }}

console.log(parseArgs(process.argv.slice(2), options))