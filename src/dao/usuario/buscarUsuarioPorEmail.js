import { conexao } from "../conexao.js";

async function buscarUsuarioPorEmail(email) {
    const sql = `SELECT id_usuario, nome, email, senha_hash FROM usuario WHERE email = ?`;

    const conn = await conexao()
    try {
        const [rows] = await conn.query(sql, [email])
        return rows[0]
    } finally {
        await conn.end()
    }
}

export { buscarUsuarioPorEmail }