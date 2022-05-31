const {fork} = require('child_process');


const getRandom = (res,cant) =>{
    const server=fork('./controllers/random.js');
    server.send(cant);
    server.on('message',(data)=>{
        res.json(data);
})
}   

module.exports = {
    getRandom
}