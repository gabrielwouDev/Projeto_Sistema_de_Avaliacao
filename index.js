import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'

import { buscarTitulos } from './src/dao/dadosCard/buscarTitulos.js';
import { cadastrarUsuario } from './src/dao/usuario/cadastrarUsuario.js'
import { buscarUsuarioPorEmail } from './src/dao/usuario/buscarUsuarioPorEmail.js'
import { buscarAvaliacoes } from './src/dao/avaliacoes/buscarAvaliacoes.js';
import { buscarMedia } from './src/dao/avaliacoes/buscarMedia.js';
import { buscarPorGenero } from './src/dao/dadosCard/buscarGenero.js';
import { buscarAno } from './src/dao/dadosCard/buscaAno.js';
import { buscarDetalhesTitulos } from './src/dao/detalhes/buscarDetalhesTitulos.js';
import { enviarAvaliacao } from './src/dao/avaliacoes/enviarAvaliacao.js';

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


app.get('/avaliacoes/:id_titulo', async (req,res) =>{
  try {
    const {id_titulo} = req.params
    const dados = await buscarAvaliacoes(id_titulo)
    res.json(dados)
  } catch (erro) {
      res.status(500).json({ erro: 'Erro ao listar Respostas', detalhes: erro.message })
    }
})

app.get('/media/:id_titulo', async (req,res) =>{
  try {
    const {id_titulo} = req.params
    const dados = await buscarMedia(id_titulo)
    res.json(dados)
  } catch (erro) {
      res.status(500).json({ erro: 'Erro ao listar Respostas', detalhes: erro.message })
    }
})

app.get('/titulos/genero/:id_genero', async (req, res) => {
    try {
        const { id_genero } = req.params;
        const dados = await buscarPorGenero(id_genero);
        res.json(dados);
    } catch (erro) {
        res.status(500).json({erro: "Erro ao buscar títulos por gênero"});
    }
});

app.get('/titulos/:ano_lancamento', async (req, res) => {
    try {
        const { ano_lancamento } = req.params;
        const dados = await buscarAno(ano_lancamento);
        res.json(dados);
    } catch (erro) {
        res.status(500).json({erro: "Erro ao buscar títulos por gênero"});
    }
});

app.get('/DetalhesTitulos/:id_titulo', async (req, res) => {
    try {
        const { id_titulo } = req.params;
        const [titulo] = await buscarDetalhesTitulos(id_titulo);
        if (!titulo) {
            return res.status(404).json({ erro: 'Título não encontrado' });
        }
        res.json(titulo);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar detalhes do título' });
    }
});

app.post('/enviarAvaliacao', async (req, res) => {
    try {
        const { nota, comentario, data_avaliacao, id_titulo, id_usuario } = req.body

        const notaNum = Number(nota)
        if (!Number.isFinite(notaNum) || notaNum < 0.5 || notaNum > 5 || !id_titulo || !id_usuario || !data_avaliacao) {
            return res.status(400).json({ erro: 'Dados da avaliação inválidos' })
        }

        const results = await enviarAvaliacao([notaNum, comentario || null, data_avaliacao, id_titulo, id_usuario])
        const atualizada = results.affectedRows === 2
        res.status(atualizada ? 200 : 201).json({
            mensagem: atualizada ? 'Avaliação atualizada!' : 'Avaliação enviada!',
            atualizada
        })
    } catch (erro) {
        if (erro.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'Você já avaliou esta obra' })
        }
        res.status(500).json({ erro: 'Erro ao enviar avaliação', detalhes: erro.message })
    }
})

app.listen(3000, () => {
  console.log('✅ Server is running on http://localhost:3000')
})