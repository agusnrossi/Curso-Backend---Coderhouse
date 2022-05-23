require('dotenv').config();


const MODO= process.env.MODO || 'prod';

const PORT= process.env.PORT || 0;

const DEBUG= process.env.DEBUG || false;

console.log({MODO, PORT, DEBUG})