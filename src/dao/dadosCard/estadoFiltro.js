import { formatString } from "./barraDePesquisa.js"

const TODAS = 'todasasobras'   // formatString('Todas as obras')

const estado = {
    texto: '',
    tipo: TODAS,
    genero: '0',
    ano: '0',
    ordem: 'maior'   // 'maior' | 'menor' popularidade
}

export function setTexto(valor) {
    estado.texto = valor
    aplicarFiltros()
}

export function setTipo(valor) {
    estado.tipo = valor
    aplicarFiltros()
}

export function setGenero(valor) {
    estado.genero = String(valor)
    aplicarFiltros()
}

export function setAno(valor) {
    estado.ano = String(valor)
    aplicarFiltros()
}

export function setOrdem(valor) {
    estado.ordem = valor
    aplicarFiltros()
}

// liga os <select> (gênero, ano e ordenação) ao estado
export function iniciarSelects() {
    document.getElementById('filtro-genero')
        .addEventListener('change', e => setGenero(e.target.value))

    document.getElementById('filtro-ano')
        .addEventListener('change', e => setAno(e.target.value))

    document.querySelector('.select-sort')
        .addEventListener('change', e => setOrdem(e.target.selectedIndex === 0 ? 'maior' : 'menor'))
}

// mais avaliações primeiro; empate: maior nota; depois ordem alfabética
function compararPopularidade(a, b) {
    return (Number(b.dataset.avaliacoes) - Number(a.dataset.avaliacoes))
        || (Number(b.dataset.nota) - Number(a.dataset.nota))
        || a.querySelector('.card-title').textContent
            .localeCompare(b.querySelector('.card-title').textContent, 'pt-BR')
}

export function aplicarFiltros() {
    const container = document.getElementById('container-cards')
    const cards = [...container.querySelectorAll('.card')]
    const semResultados = document.getElementById('sem-resultados')
    const infoResultados = document.querySelector('.results-info-bar span')

    // ordenação
    cards.sort(compararPopularidade)
    if (estado.ordem === 'menor') cards.reverse()
    cards.forEach(card => container.append(card))

    // filtros
    let visiveis = 0
    cards.forEach(card => {
        const titulo = formatString(card.querySelector('.card-title').textContent)

        const passaBusca = titulo.includes(estado.texto)
        // aba "Filmes" -> "filmes" começa com "filme" (idem séries e animes)
        const passaTipo = estado.tipo === TODAS || estado.tipo.startsWith(card.dataset.tipo)
        const passaGenero = estado.genero === '0' ||
            card.dataset.generos.split(',').includes(estado.genero)
        const passaAno = estado.ano === '0' || card.dataset.ano === estado.ano

        const visivel = passaBusca && passaTipo && passaGenero && passaAno
        card.style.display = visivel ? '' : 'none'
        if (visivel) visiveis++
    })

    semResultados.style.display = visiveis ? 'none' : 'block'
    if (infoResultados) {
        infoResultados.textContent = `Exibindo ${visiveis} de ${cards.length} obras`
    }
}
