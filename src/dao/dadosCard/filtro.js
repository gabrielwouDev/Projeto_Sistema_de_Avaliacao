import { formatString } from "./barraDePesquisa.js";

function iniciarFiltro(btns,cards){
    btns.forEach(btn => {
        btn.addEventListener('click', () => {

            // Remove active dos outros botões
            btns.forEach(button => button.classList.remove('active'));

            // Adiciona active ao botão clicado
            btn.classList.add('active');

            // Captura o filtro selecionado
            const filtro = formatString(btn.textContent);
            
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

