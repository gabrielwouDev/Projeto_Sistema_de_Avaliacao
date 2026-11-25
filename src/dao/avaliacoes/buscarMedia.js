import { conexao } from "../conexao.js";

async function buscarMedia(id_titulo){
  const sql = ' SELECT ROUND(AVG(nota), 1) AS media, COUNT(*) AS quantidade FROM avaliacao WHERE id_titulo = ?; ';
  
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

export {buscarMedia}