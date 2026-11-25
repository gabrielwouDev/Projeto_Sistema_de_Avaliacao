import { conexao } from "../conexao.js";

async function enviarAvaliacao(infos) {
    const sql = 'INSERT INTO avaliacao (nota, comentario, data_avaliacao, id_titulo, id_usuario) VALUES (?, ?, ?, ?, ?)'

    const conn = await conexao()
    try {
        const [results] = await conn.query(sql, infos)
        return results
    } finally {
        await conn.end()
    }
}

export { enviarAvaliacao }