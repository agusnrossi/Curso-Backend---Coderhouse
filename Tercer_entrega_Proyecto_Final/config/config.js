require('dotenv').config();
const { ENV } = require('../../Segunda_entrega_Proyecto_Final/config/config');
const firebaseConfig= require('./db/firebase.config.json')

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8080;
const PERS= process.env.PERS || 'mongo';





module.exports={


   
        PORT: PORT || 8080,
        PERS: PERS || 'mongo',

    DB_CONFIG:{
        mongodb:{
           uri:MONGODB_URI
                },
        firebase:{
            credential: firebaseConfig,
        }         
    
    }
}