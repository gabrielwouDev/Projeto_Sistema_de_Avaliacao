import { conexao } from "../conexao.js";

async function buscarAvaliacoes(id_titulo){
  const sql = `
        SELECT
            a.id_avaliacao,
            a.nota,
            a.comentario,
            a.data_avaliacao,
            a.id_titulo,
            a.id_usuario,
            u.nome AS nome_usuario
        FROM avaliacao AS a
        INNER JOIN usuario AS u ON u.id_usuario = a.id_usuario
        WHERE a.id_titulo = ?
        ORDER BY a.data_avaliacao DESC, a.id_avaliacao DESC
    `;
  
  const conn = await conexao()
  try {
      // Executar a consulta
      const [rows, fields] = await conn.query(sql, [id_titulo]);
      await conn.end()
      return rows
    } catch (err) {
      return err.message
    }

}

export {buscarAvaliacoes}