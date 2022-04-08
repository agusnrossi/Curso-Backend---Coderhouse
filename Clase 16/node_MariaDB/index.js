const {database}=require('./database/mariaDB');
const knex=require('knex')(database);

knex.schema.createTable('productos',(table)=>{
    table.increments('id');
    table.string('nombre',15).notNullable(); //varchar(15)
    table.string('codigo',10); //varchar(10)
    table.float('precio'); //float
    table.integer('stock'); //int
})
.then(()=>console.log('table created'))
.catch((err)=>console.log(err))

    
    const productos=[
        {nombre:'Laptop',codigo:'LAP-001',precio:1000,stock:10},
        {nombre:'Mouse',codigo:'MOU-001',precio:50,stock:20},
        {nombre:'Teclado',codigo:'TEC-001',precio:100,stock:30},
        {nombre:'Monitor',codigo:'MON-001',precio:200,stock:40},
        {nombre:'Impresora',codigo:'IMP-001',precio:300,stock:50}
    ];


(async function(){
    try{
       await knex('productos').insert(productos);
        console.log('productos insertados');

        console.log('----->obtenemos los productos')
        let rows=await knex('productos').select('*')
        for(rows of rows) console.log(`${rows.id} - ${rows.nombre} - ${rows.precio} - ${rows.codigo} - ${rows.stock}`)   



        /*
        console.log('----->borramos desde el id=15')
        await knex('productos').where('id','>=',6).del()
*/


        console.log('----->borramos producto con id=3')
        await knex('productos').where('id',3).del()
        

        console.log('----->actualizamos el stock del producto con id=2')
        await knex('productos').where('id',2).update({stock:0})
        for(rows of rows) console.log(`${rows.id} - ${rows.nombre} - ${rows.precio} - ${rows.codigo} - ${rows.stock}`)

    }catch(err){
        console.log(err);
    }finally{
        await knex.destroy();
    }
})()


