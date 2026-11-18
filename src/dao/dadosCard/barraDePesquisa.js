import { setTexto } from "./estadoFiltro.js"

function iniciarBarraPesquisa(input) {
    input.addEventListener('input', (event) => {
        setTexto(formatString(event.target.value))
    })
}

function formatString(value) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '')
        .trim()
}

export { iniciarBarraPesquisa, formatString }