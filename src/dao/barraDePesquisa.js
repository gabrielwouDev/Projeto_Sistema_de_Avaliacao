const searchInput = document.getElementById('#') // Busca a tag da barra de pesquisa

searchInput.addEventListener('input',(event) => { // Adiciona um listener a barra de pesquisa 
    const texto = formatString(event.target.value); // Pega o que o usuário digitou e armazena na váriavel 'texto'

    const items = document.querySelectorAll('#') // Buscar títulos dos items futuramente

    items.forEach(item =>{
        if(formatString(item.textContent).indexOf(texto) !== -1){ // Compara o texto dos títulos do HTML com o inserido na barra de pesquisa pelo usuário
            item.style.display = 'flex'; // Aparece o semelhante
        } else{
            item.style.display = 'block'; // Esconde quem não for semelhante
        }
    });
}); 


function formatString(value){ // Função que formata o texto para letras minúsculas e remove espaços em branco
    return value.toLowerCase().trim()
}