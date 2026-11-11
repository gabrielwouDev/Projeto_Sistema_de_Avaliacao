import { conexao } from "../conexao.js";

async function buscarTitulos() {
    const sql = `
        SELECT
            t.id_titulo,
            t.nome,
            t.ano_lancamento,
            t.tipo,
            t.imagem_url,
            GROUP_CONCAT(DISTINCT g.nome ORDER BY g.nome SEPARATOR ', ') AS generos,
            ROUND(AVG(a.nota), 1) AS nota_media
        FROM titulo t
        LEFT JOIN titulo_genero tg ON tg.id_titulo = t.id_titulo
        LEFT JOIN genero g         ON g.id_genero = tg.id_genero
        LEFT JOIN avaliacao a      ON a.id_titulo = t.id_titulo
        GROUP BY t.id_titulo
        ORDER BY t.nome
    `;

    const conn = await conexao()
    try {
        const [rows] = await conn.query(sql)
        return rows
    } finally {
        await conn.end()
    }
}

export { buscarTitulos }
