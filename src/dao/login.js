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

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const resposta = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
        localStorage.setItem('usuario', JSON.stringify(resultado));
        window.location.href = 'index.html';
    } else {
        alert(resultado.erro);
    }
});