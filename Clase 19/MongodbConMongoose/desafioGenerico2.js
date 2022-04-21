const mongoose= require("mongoose");
const modelEstudiantes= require("./models/estudiantes");


CRUD()

async function CRUD(){
    try{
    const URL= "mongodb://127.0.0.1:27017/colegio1";
    let rta= await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true
    });
    console.log("Conectado a la base de datos");


    
   // console.log(await modelEstudiantes.find({}));



   //------------Ejercicio 1 a)-----------------//
/*
   console.log('----------Orden alfabetico-----------')
   await modelEstudiantes.find({}).sort({nombre:1})
    .then((data)=>{console.log(data)})

    //------------Ejercicio 1 b)-----------------//

    console.log('----------Estudiante mas joven-----------')

    await modelEstudiantes.find({}).sort({edad:1}).limit(1)
    .then((data)=>{console.log(data)})

    //------------Ejercicio 1 c)-----------------//

    console.log('----------Estudiante del curso 2A-----------')

    await modelEstudiantes.find({curso:'2A'})
    .then((data)=>{console.log(data)})
*/
    //------------Ejercicio 1 d)-----------------//

   /* console.log('----------El segundo estudiante mas joven-----------')

    await modelEstudiantes.find({}).sort({edad:1}).skip(1).limit(1)
    .then((data)=>{console.log(data)})

*/
    //------------Ejercicio 1 e)-----------------//
/*
    console.log('----------solo nombre, apellido y curso de estudiantes en orden descendente de apellido-----------')
    
    await modelEstudiantes.find({},{_id:0,nombre:1, apellido:1,curso:1}).sort({apellido:-1})
    .then((data)=>{console.log(data)})
*/
    //------------Ejercicio 1 f)-----------------//

    console.log('----------Estudiantes con nota igual a 10-----------')
    console.log('\n')
    await modelEstudiantes.find({nota:10},{_id:0,nombre:1, apellido:1,nota:1})
    .then((data)=>{console.log(data)})

    //------------Ejercicio 1 g)-----------------//

    console.log('----------promedio-----------')
    console.log('\n')
    await modelEstudiantes.aggregate([
        {$group:{_id:"promedio",avg_val:{$avg:"$nota"}}}
    ])
    .then((data)=>{console.log(data)})

    //------------Ejercicio 1 h)-----------------//

    console.log('-----------promedio notas del curso 1A-----------')
    console.log('\n')
    await modelEstudiantes.aggregate([

        {$match:{curso:'1A'}},
        {$group:{_id:"promedio",avg_val:{$avg:"$nota"}}}
    ])
    .then((data)=>{console.log(data)})


}catch(error){
        console.log(error);
    }
}