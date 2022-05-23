const parseArgs = require('minimist');

const args = parseArgs(process.argv.slice(2));

//console.log (args)

console.log(parseArgs(['1', '2', '3', '4']))

console.log(parseArgs(['-a', '1', '-b', '2', '3', '4']))

console.log(parseArgs(['--n1', '1', '--n2', '2', '3', '4']))

console.log(parseArgs(['-a', '1', '-b', '2', '--colores', '--cursiva']))

console.log(parseArgs(['-a', '1', '-b', '2', '-c', '-x']))
