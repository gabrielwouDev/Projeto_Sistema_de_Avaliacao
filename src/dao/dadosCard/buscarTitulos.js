import { conexao } from "../conexao.js";

async function buscarTitulos(){
  const sql = 'SELECT * FROM titulo';
  
  const conn = await conexao()
  try {
      // Executar a consulta
      const [rows, fields] = await conn.query(sql);
      await conn.end()
      return rows
    } catch (err) {
      return err.message
    }

}

export {buscarTitulos}
