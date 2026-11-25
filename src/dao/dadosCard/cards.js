import { buscarDados } from "./buscarDados.js"
import { gerarCard } from "./gerarElementos.js"
import { iniciarBarraPesquisa } from "./barraDePesquisa.js"
import { iniciarFiltro } from "./filtro.js"
import { iniciarSelects, aplicarFiltros } from "./estadoFiltro.js"

const titulos = await buscarDados('http://localhost:3000/titulos')
const container = document.querySelector('#container-cards')
const searchInput = document.getElementById('search')
const btns = document.querySelectorAll('.tab-pill')
const filtroAno = document.getElementById('filtro-ano')

titulos.forEach(item => container.append(gerarCard(item)))

// anos disponíveis vêm do banco (mantém a opção "Qualquer ano")
;[...new Set(titulos.map(t => t.ano_lancamento))]
    .sort((a, b) => a - b)
    .forEach(ano => {
        const opcao = document.createElement('option')
        opcao.value = ano
        opcao.textContent = ano
        filtroAno.append(opcao)
    })

btns[0]?.classList.add('active')   // "Todas as obras" começa selecionada

iniciarBarraPesquisa(searchInput)
iniciarFiltro(btns)
iniciarSelects()

aplicarFiltros()   // ordena por popularidade e atualiza o contador
