import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'

import { buscarTitulos } from './src/dao/dadosCard/buscarTitulos.js';
import { cadastrarUsuario } from './src/dao/usuario/cadastrarUsuario.js'
import { buscarUsuarioPorEmail } from './src/dao/usuario/buscarUsuarioPorEmail.js'

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
      res.status(500).json({ erro: 'Erro ao Buscar Títulos', detalhes: erro.message })
    }
})


app.post('/cadastro', async (req, res) => {
  try {
    const nome = req.body.nome?.trim()
    const email = req.body.email?.trim().toLowerCase()
    const senha = req.body.senha

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Dados incompletos' })
    }
    
    if (senha.length < 8 || Buffer.byteLength(senha, 'utf8') > 72) {
      return res.status(400).json({ erro: 'A senha deve ter no mínimo 8 caracteres' })
    }

    const senhaHash = await bcrypt.hash(senha, 12)
    await cadastrarUsuario({ nome, email, senhaHash })

    res.status(201).json({ mensagem: 'Cadastro realizado!' })
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Este e-mail já está cadastrado' })
    }
    res.status(500).json({ erro: 'Erro ao cadastrar', detalhes: erro.message })
  }
})


app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body

    const usuario = await buscarUsuarioPorEmail(email)
    const ok = usuario && await bcrypt.compare(senha, usuario.senha_hash)

    if (!ok) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos' })
    }

    res.json({ id: usuario.id_usuario, nome: usuario.nome })
  } catch (erro) {
    res.status(500).json({ erro: 'Erro no login' })
  }
})


app.listen(3000, () => {
  console.log('✅ Server is running on http://localhost:3000')
})