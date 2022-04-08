const{options}=require('./options/mariaDB.js')
const knex=require('knex')

(async ()=>{
    
    try{
        console.log('----->borramos todos los autos')
        await knex('cars').del()
    
        console.log('----->insertamos autos')
        await knex('cars').insert(cars)

        console.log('----->obtenemos los autos')
        let rows=await knex('cars').select('*')
        for(rows of rows) console.log(`${rows.id} - ${rows.name} - ${rows.price}`)
        
        console.log('------>insertamos un auto mas')
        await knex('cars').insert({name:'Ferrari',price:1000000})

        console.log('------>obtenemos los autos actualizados')
        rows=await knex('cars').select('*')
        for(rows of rows) console.log(`${rows.id} - ${rows.name} - ${rows.price}`)

        console.log('------->ordenamos los autos por precio')
        rows=await knex('cars').select('*').orderBy('price','desc')
    }
    catch(err){
        console.log(err)
    }
    finally{
        knex.destroy()
    }
})()



    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    