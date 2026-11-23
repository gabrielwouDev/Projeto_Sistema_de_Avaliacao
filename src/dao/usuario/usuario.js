const area = document.querySelector('.user-name');
const usuario = JSON.parse(localStorage.getItem('usuario'));

if (usuario) {
    // logado: ícone genérico + nome
    const icone = document.createElement('img');
    icone.className = 'user-icon';
    icone.src = '../../../vault_project/imgs/user-icon.png';

    const nome = document.createElement('span');
    nome.className = 'user-label';
    nome.textContent = usuario.nome;

    area.append(icone, nome);
} else {
    // deslogado: imagem de login + texto "log-in", levando para a tela de login
    const link = document.createElement('a');
    link.href = 'login.html';
    link.className = 'login-link';

    const imagem = document.createElement('img');
    imagem.src = '../../../vault_project/imgs/login-icon.png';
    imagem.alt = '';
    imagem.className = 'login-img';

    const texto = document.createElement('span');
    texto.className = 'user-label';
    texto.textContent = 'log-in';

    link.append(imagem, texto);
    area.append(link);
}