document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var nomeImagens = document.getElementById('imagem'),
        $fileName = document.getElementById('nome-arquivos');

    nomeImagens.addEventListener('change', function () {
        $fileName.textContent = this.value;
    });

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const cnpj = document.getElementById('cnpj').value;
    const website = document.getElementById('website').value;
    const descricao = document.getElementById('descricao').value;
    const imagens = document.getElementById('imagem').files;

    // Exemplo de como utilizar os valores
    console.log(nome, email, senha, confirmarSenha, telefone, endereco, cnpj, website, descricao, imagens);
});