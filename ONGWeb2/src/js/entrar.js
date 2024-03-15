document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (email === 'usuario@example.com' && senha === 'senha123') {
        alert('Login bem sucedido!');
    } else {
        alert('Email ou senha incorretos. Tente novamente.');
    }
});
