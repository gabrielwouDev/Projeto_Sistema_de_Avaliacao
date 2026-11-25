import { conexao } from "../conexao.js";

async function buscarDetalhesTitulos(id_titulo) {
    const sql = `
        SELECT
            t.*,
            GROUP_CONCAT(DISTINCT g.nome ORDER BY g.nome SEPARATOR ', ') AS generos
        FROM titulo t
        LEFT JOIN titulo_genero tg ON tg.id_titulo = t.id_titulo
        LEFT JOIN genero g         ON g.id_genero = tg.id_genero
        WHERE t.id_titulo = ?
        GROUP BY t.id_titulo
    `

    const conn = await conexao()
    try {
        const [rows] = await conn.query(sql, [id_titulo])
        return rows
    } finally {
        await conn.end()
    }
}

export { buscarDetalhesTitulos }