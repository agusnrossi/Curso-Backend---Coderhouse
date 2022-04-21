const mongoose= require("mongoose");
const modelEstudiantes= require("./models/estudiantes");


CRUD()

async function CRUD(){
    try{
    const URL= "mongodb://127.0.0.1:27017/colegio1";
    let rta= await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true
    });
    console.log("Conectado a la base de datos");


    
    //--------------- ejercicio 1---------------//
/*
    await modelEstudiantes.updateOne({apellido:"Blanco"},{$set:{dni:"20355875"}})
    .then((data)=>{console.log(data)})

    console.log(await modelEstudiantes.find({apellido:"Blanco"}))
*/

    //--------------- ejercicio 2---------------//
/*
    await modelEstudiantes.updateMany({},{$set:{ingreso:false}},{
        returnDocument:false,
        new:true,
        strict:false,
    })
    .then((data)=>{console.log(data)})
*/
    //--------------- ejercicio 3---------------//
/*
    await modelEstudiantes.updateMany({curso:'1A'},{$set:{ingreso:true}},{
        returnDocument:true,
        new:true,
        strict:false,
    })
    .then((data)=>{console.log(data)})

    console.log(await modelEstudiantes.find({curso:"1A"}))

    //--------------- ejercicio 4---------------//

    console.log('-------buscar solo nombre y apellido de los estudiantes con notas mayores a 4--------')

    await modelEstudiantes.find({ nota:{$gt:4}},{_id:0, __v:0})
    .then((data)=>{console.log(data)})
*/
    //--------------- ejercicio 5---------------//

    console.log('---------- estudiantes con ingreso true')

    await modelEstudiantes.find({ ingreso:true},{_id:0, __v:0})
    .then((data)=>{console.log(data)})


    //--------------- ejercicio 6---------------//

    await modelEstudiantes.deleteMany({ingreso:true})
    .then((data)=>{console.log(data)})
    

}catch(error){
        console.log(error);
    }
}