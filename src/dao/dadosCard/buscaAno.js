import { conexao } from "../conexao.js";

async function buscarAno(ano_lancamento){
  const sql = 'SELECT * FROM titulo WHERE ano_lancamento = ?;'
  
  const conn = await conexao()
  try {
      // Executar a consulta
      const [rows, fields] = await conn.query(sql, [ano_lancamento]);
      await conn.end()
      return rows
    } catch (err) {
      return err.message
    }

}

export {buscarAno}