document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();
});

function formatarTelefone(input) {
    const digitos = input.value.replace(/\D/g, '');

    let telefoneFormatado = '';
    if (digitos.length > 0) {
        telefoneFormatado = '(' + digitos.substring(0, 2);
        if (digitos.length > 2) {
            telefoneFormatado += ') ' + digitos.substring(2, 6);
        }
        if (digitos.length > 6) {
            telefoneFormatado += '-' + digitos.substring(6, 11);
        }
    }
    input.value = telefoneFormatado;
}

function formatarCNPJ(input) {
    const digitos = input.value.replace(/\D/g, '');

    let cnpjFormatado = '';
    if (digitos.length > 0) {
        cnpjFormatado = digitos.substring(0, 2);
        if (digitos.length > 2) {
            cnpjFormatado += '.' + digitos.substring(2, 5);
        }
        if (digitos.length > 5) {
            cnpjFormatado += '.' + digitos.substring(5, 8);
        }
        if (digitos.length > 8) {
            cnpjFormatado += '/' + digitos.substring(8, 12);
        }
        if (digitos.length > 12) {
            cnpjFormatado += '-' + digitos.substring(12, 14);
        }
    }
    
    if (event.keyCode === 8) {
        cnpjFormatado -= cnpjFormatado[-1]
    }

    input.value = cnpjFormatado;

}



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
