document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();
});

function handleFiles(files) {
    const previewImagens = document.getElementById('previewImagens');
    previewImagens.innerHTML = '';

    for (const file of files) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const image = document.createElement('img');
            image.src = event.target.result;
            previewImagens.appendChild(image);
        };
        reader.readAsDataURL(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const dt = event.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('rua').value;
    const cnpj = document.getElementById('cnpj').value;
    const website = document.getElementById('website').value;
    const descricao = document.getElementById('descricao').value;
    const imagens = document.getElementById('imagemInput').files;

    if (senha !== confirmarSenha) {
        alert("Confirmação de Senha Inválida");
        return false;
    } else {
        return true;
    }
}
