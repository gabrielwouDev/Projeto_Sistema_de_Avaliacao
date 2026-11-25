import { conexao } from "../conexao.js";

async function buscarPorGenero(id_genero) {

    const sql = `
        SELECT 
            t.id_titulo,
            t.nome,
            t.sinopse,
            t.imagem_url,
            t.ano_lancamento,
            t.tipo,
            g.nome AS genero
        FROM titulo t
        INNER JOIN titulo_genero tg     ON t.id_titulo = tg.id_titulo
        INNER JOIN genero g             ON tg.id_genero = g.id_genero
        WHERE g.id_genero = ?
    `;


    const conn = await conexao()
    try {
        const [rows] =  await conn.query(sql, [id_genero]);
        return rows
    } finally {
        await conn.end()
    }

   
}
export {buscarPorGenero}
