import { conexao } from "../conexao.js";

async function cadastrarUsuario({ nome, email, senhaHash }) {
    const sql = `INSERT INTO usuario (nome, email, senha_hash) VALUES (?, ?, ?)`;

    const conn = await conexao()
    try {
        const [resultado] = await conn.query(sql, [nome, email, senhaHash])
        return resultado.insertId
    } finally {
        await conn.end()
    }
}

export { cadastrarUsuario }