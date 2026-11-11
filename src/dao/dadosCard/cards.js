import { buscarDados } from "./buscarDados.js"
import { gerarCard } from "./gerarElementos.js"

const titulos = await buscarDados('http://localhost:3000/titulos')
const container = document.querySelector('#container-cards')

titulos.forEach(item => container.append(gerarCard(item)))


//Barra de pesquisa
const searchInput = document.getElementById('search')

searchInput.addEventListener('input', (event) => {
    const texto = formatString(event.target.value)

    document.querySelectorAll('#container-cards .card').forEach(card => {
        const titulo = formatString(card.querySelector('.card-title').textContent)
        card.style.display = titulo.includes(texto) ? '' : 'none'
    })
})

function formatString(value) {
    return value
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')   // ignora acentos
}