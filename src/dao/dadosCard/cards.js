import { buscarDados } from "./buscarDados.js"
import { gerarCard } from "./gerarElementos.js"
import { iniciarBarraPesquisa,formatString } from "./barraDePesquisa.js"

const titulos = await buscarDados('http://localhost:3000/titulos')
const container = document.querySelector('#container-cards')
const searchInput = document.getElementById('search')
const btns = document.querySelectorAll('.tab-pill');
const cards = document.querySelectorAll('#container-cards .card');

titulos.forEach(item => container.append(gerarCard(item)))

iniciarBarraPesquisa(searchInput,container)

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

