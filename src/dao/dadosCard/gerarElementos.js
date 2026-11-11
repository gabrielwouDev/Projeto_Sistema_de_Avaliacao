function gerarHtml(tag, classe, texto) {
    const el = document.createElement(tag)
    if (classe) el.className = classe
    if (texto !== undefined && texto !== null) el.textContent = texto
    return el
}

function gerarCard(dados) {
    const card = gerarHtml('div', 'card')

    // --- Imagem + tag + overlay ---
    const wrapper = gerarHtml('div', 'card-image-wrapper')

    const tag = gerarHtml('span', 'tag-type', dados.tipo.toUpperCase())

    const img = gerarHtml('img')
    img.src = dados.imagem_url || 'img/sem-capa.jpg'   // usa a padrão se vier vazio/NULL
    img.alt = dados.nome

    const overlay = gerarHtml('div', 'card-hover-overlay')
    const link = gerarHtml('a', 'btn-details', 'Ver detalhes ')
    link.href = `detalhes.html?id=${encodeURIComponent(dados.id_titulo)}`
    link.append(gerarHtml('span', 'arrow', '↗'))
    overlay.append(link)

    wrapper.append(tag, img, overlay)

    // --- Informações ---
    const info = gerarHtml('div', 'card-info')
    const titulo = gerarHtml('h4', 'card-title', dados.nome)

    const meta = gerarHtml('div', 'card-meta')
    const detalhes = gerarHtml('span', '',
        [dados.ano_lancamento, dados.generos].filter(Boolean).join(' • '))

    const nota = gerarHtml('span', 'card-rating',
        dados.nota_media !== null
            ? `★ ${Number(dados.nota_media).toLocaleString('pt-BR', { minimumFractionDigits: 1 })}`
            : '★ —')

    meta.append(detalhes, nota)
    info.append(titulo, meta)

    card.append(wrapper, info)
    return card
}

export { gerarCard }