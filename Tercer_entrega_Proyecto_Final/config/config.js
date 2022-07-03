require('dotenv').config();

const firebaseConfig= require('./db/firebase.config.json')

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8080;
const PERS= process.env.PERS || 'mongo';
const {TWILIO_ID} = process.env;
const {TWILIO_TOKEN} = process.env;
const {ADMIN_PHONE} = process.env;
const {ADMIN_EMAIL} = process.env;





module.exports={

    TWILIO_ID: TWILIO_ID,
    TWILIO_TOKEN: TWILIO_TOKEN,

    ADMIN_PHONE: ADMIN_PHONE,
    ADMIN_EMAIL: ADMIN_EMAIL,
   
        PORT: PORT || 8080,
        PERS: PERS || 'mongo',

    DB_CONFIG:{
        mongodb: {
        connectTo: (database) => 
        `mongodb+srv://${DB_URI}.knuiz.mongodb.net/${database}?retryWrites=true&w=majority`
                },
        firebase:{
            credential: firebaseConfig,
        }         
    
    }
}