
//--------------Ejercicio 1 ----------------//
db.clientes.insertMany([{"nombre":"Pablo","edad":25},{"nombre" : "Juan", "edad" : 22},{ "nombre" : "Lucia", "edad" : 25},{"nombre":"Juan","edad":29},{"nombre":"Fede","edad":35}])

//--------------Ejercicio 2 ----------------//

db.clientes.find().sort({edad:-1})

//--------------Ejercicio 3 ----------------//

db.clientes.find().sort({edad:1}).limit(1)

//--------------Ejercicio 4 ----------------//

db.clientes.find().sort({edad:1}).limit(2)


//--------------Ejercicio 5 ----------------//

db.clientes.find({nombre:"Juan"})

//--------------Ejercicio 6 ----------------//

db.clientes.find({nombre:"Juan",edad:29})

//--------------Ejercicio 7 ----------------//

db.clientes.find({$or:[{nombre:"Juan"},{nombre:"Lucia"}]})

//--------------Ejercicio 8 ----------------//

db.clientes.find({edad:{$gt:25}})

//--------------Ejercicio 9 ----------------//

db.clientes.find({edad:{$lte:25}})

//--------------Ejercicio 10 ----------------//

db.clientes.find({edad:{$ne:25}})

//--------------Ejercicio 11 ----------------//

db.clientes.find({$and:[{"edad":{$gte:26}},{"edad":{$lte:36}}]})

//--------------Ejercicio 12 ----------------//

db.clientes.update({nombre:"Fede"}, {$set:{edad:36}})
db.clientes.find()

//--------------Ejercicio 13 ----------------//

db.clientes.updateMany({"edad":25},{$set:{"edad":26}})
db.clientes.find()

//--------------Ejercicio 14 ----------------//

db.clientes.deleteMany({nombre:"Juan"})
db.clientes.find()



