
function iniciarBarraPesquisa(input,container) {
    input.addEventListener('input', (event) => {
        const texto = formatString(event.target.value)
        const semResultados = document.getElementById('sem-resultados')

        let temResultado = false;

        container.querySelectorAll('#container-cards .card').forEach(card => {
            const titulo = formatString(card.querySelector('.card-title').textContent)
            if(titulo.includes(texto)){
                card.style.display = ''

                temResultado = true
            }else{
                card.style.display = 'none'
            }
        })
        
        if(temResultado){
            semResultados.style.display = 'none'
        }else{
            semResultados.style.display = 'block'
        }
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

export{ iniciarBarraPesquisa , formatString }