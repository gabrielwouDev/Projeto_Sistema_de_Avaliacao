import express from 'express'
import cors from 'cors'

import { buscarTitulos } from './src/dao/dadosCard/buscarTitulos.js';

const app = express()

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ mensagem: 'API está funcionando corretamente!' })
})

app.get('/titulos', async (req,res) =>{
  try {
    const dados = await buscarTitulos()
    res.json(dados)
  } catch (erro) {
      res.status(500).json({ erro: 'Erro ao listar Respostas', detalhes: erro.message })
    }
})


app.listen(3000, () => {
  console.log('✅ Server is running on http://localhost:3000')
})