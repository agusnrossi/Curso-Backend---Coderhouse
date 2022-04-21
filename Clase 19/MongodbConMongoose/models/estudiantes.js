const mongoose= require("mongoose");


 const estudiantesCollection = mongoose.Schema({
    nombre: {type:String,required:true,max:50},
    apellido:{type:String,required:true,max:50},
    edad:{type:Number,required:true},
    dni:{type:String,required:true,max:50,unique:true},
    curso:{type:String,required:true,max:50},
    nota:{type:Number,required:true}
});

module.exports= mongoose.model("estudiantes", estudiantesCollection);

