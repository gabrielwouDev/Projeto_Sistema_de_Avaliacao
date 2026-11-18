import { formatString } from "./barraDePesquisa.js"

const estado = {
    texto: '',
    tipo: formatString('Todas as obras')
}

const TODAS = formatString('Todas as obras')

export function setTexto(valor) {
    estado.texto = valor
    aplicarFiltros()
}

export function setTipo(valor) {
    estado.tipo = valor
    aplicarFiltros()
}

export function aplicarFiltros() {
    const cards = document.querySelectorAll('#container-cards .card')
    const semResultados = document.getElementById('sem-resultados')
    let temResultado = false

    cards.forEach(card => {
        const titulo = formatString(card.querySelector('.card-title').textContent)
        const tipo = formatString(card.querySelector('.tag-type').textContent)

        const passaBusca = titulo.includes(estado.texto)
        const passaTipo = estado.tipo === TODAS || tipo === estado.tipo

        const visivel = passaBusca && passaTipo
        card.style.display = visivel ? '' : 'none'
        if (visivel) temResultado = true
    })

    semResultados.style.display = temResultado ? 'none' : 'block'
}