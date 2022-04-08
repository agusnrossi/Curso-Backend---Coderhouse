const {options}=require('./options/mariaDB.js')
const knex=require('knex')(options)

knex.from('cars').select('name','price').orderBy('price','desc').then(cars=>{
    console.log(cars)
}
).catch(err=>{
    console.log(err)
}
).finally(()=>{
    knex.destroy()
})