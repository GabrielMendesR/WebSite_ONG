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

    const obj = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        confirmarSenha: document.getElementById('confirmarSenha').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('rua').value,
        cnpj: document.getElementById('cnpj').value,
        website: document.getElementById('website').value,
        descricao: document.getElementById('descricao').value,
        imagens: document.getElementById('imagemInput').files,
    }

    if (obj.senha !== obj.confirmarSenha) { return alert("Confirmação de Senha Inválida"); } 

    axios.post('http://localhost:3000/api/ong', obj)
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
