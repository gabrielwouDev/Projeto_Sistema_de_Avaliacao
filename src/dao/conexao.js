import mysql from "mysql2/promise"

async function conexao() {
    const pool = mysql.createPool({
        host: '', 
        port: ,
        user: '', 
        password: '', 
        database: ''
    })
    
    return pool
}

export { conexao }