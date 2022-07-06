const sqlite={
    client: 'sqlite3',
    connection: {
        filename:'../db/ecommerce/mydb.sqlite'
    },
    useNullAsDefault: true
}

const mysql={
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce'
    },
}

module.exports = { sqlite, mysql }
//------------------------------------------------------------------//