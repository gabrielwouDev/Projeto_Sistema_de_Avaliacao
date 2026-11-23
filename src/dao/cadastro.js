const toggleButtons = document.querySelectorAll('.toggle-password');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const inputId = button.dataset.target;
        const input = document.getElementById(inputId);

        if (input.type === 'password') {
            input.type = 'text';
            button.textContent = 'Ocultar';
        } else {
            input.type = 'password';
            button.textContent = 'Mostrar';
        }

    });
});

const form = document.querySelector('.cadastro-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    try {
        const resposta = await fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha }),
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            window.location.href = 'login.html';
        } else {
            alert(resultado.erro);
        }
    } catch (erro) {
        alert('Não foi possível conectar ao servidor.');
    }
});