/*import { formatString } from "./barraDePesquisa";

function iniciarFiltro(btns,cards){
    btns.forEach(btn => {
        btn.addEventListener('click', () => {

            // Remove active dos outros botões
            btns.forEach(button => button.classList.remove('active'));

            // Adiciona active ao botão clicado
            btn.classList.add('active');

            // Captura o filtro selecionado
            const filtro = formatString(btn.textContent);
            console.log('Filtro selecionado:', filtro);
            // Filtra os cards
            cards.forEach(card => {
                const tipo = formatString(
                    card.querySelector('.tag-type').textContent
                );
                
                card.style.display = filtro === 'todas as obras' || tipo === filtro ? '' : 'none';
                    
            });
        });
    });
}

export{ iniciarFiltro } 
*/
