
function iniciarBarraPesquisa(input,container) {
    input.addEventListener('input', (event) => {
    const texto = formatString(event.target.value)

        container.querySelectorAll('#container-cards .card').forEach(card => {
            const titulo = formatString(card.querySelector('.card-title').textContent)
            card.style.display = titulo.includes(texto) ? '' : 'none'
        })
    })
}


function formatString(value) {
    return value
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        ;  // ignora acentos
}

export{ iniciarBarraPesquisa , formatString }