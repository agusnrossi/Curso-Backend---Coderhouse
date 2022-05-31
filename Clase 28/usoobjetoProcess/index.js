process.on('exit',()=>{
    console.log('codigo :' + codigoError)
})

let codigoError=0

const args = process.argv.slice(2).sort((a,b) =>{return a-b})
console.log(args)

//-------validacion de argumentos -------------//

var objeto={}

if(args.length==0){
    objeto={error:{ descripcion:'entrada vacia'}}
    codigoError=-4
   
    process.exit()
}

let error = false



const arrTPD = args.map(e =>{
   if(isNaN(parseInt(e))){
       error = true
       return 'String'
   }else{
       return typeof parseInt(e)
   }
})

if(error){
  objeto={error:{ descripcion:'error tipo de datos',
     numeros:args,
     tipos:arrTPD}}
     codigoError=-5
}else{
//-------------------------------------------//

let suma = 0

args.forEach(element => {suma=parseInt(suma)+parseInt(element)});

objeto={
    datos:{
        numeros:args,
        promedio: suma/args.length ,
        max:args[args.length-1],
        min:args[0],
        ejecutable: process.title,
        pid: process.pid,
    }
}
}
console.log(objeto)