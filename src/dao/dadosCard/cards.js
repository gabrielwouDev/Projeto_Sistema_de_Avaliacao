import { buscarDados } from "./buscarDados.js"
import { gerarCard } from "./gerarElementos.js"
import { iniciarBarraPesquisa } from "./barraDePesquisa.js"
import { iniciarFiltro } from "./filtro.js"

const titulos = await buscarDados('http://localhost:3000/titulos')
const container = document.querySelector('#container-cards')
const searchInput = document.getElementById('search')
const btns = document.querySelectorAll('.tab-pill')

titulos.forEach(item => container.append(gerarCard(item)))

iniciarBarraPesquisa(searchInput)
iniciarFiltro(btns)