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


function getOngImagesTest() {
    axios.get('http://152.67.41.48:3000/api/ong/images')
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response.data);
    });
}

function uploadImageTest() {

    const formData = new FormData();
    const images = document.getElementById('imagemInput').files;
    const token = localStorage.getItem('token');
    
    formData.append('image', images[0]);


    axios.post('http://152.67.41.48:3000/api/ong/images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response.data);
    });
}

function getOngsTest() {
    const token = localStorage.getItem('token');
    axios.get('http://152.67.41.48:3000/api/ong', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response.data);
    });
}

function fireErrorMessage(text) {
    Swal.fire({
        position: "top-end",
        icon: "error",
        text: text,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
    });
}

function validateForm(form) {
    return new Promise((resolve, reject) => {
        
        if (form.get('senha') !== form.get('confirmarSenha')) 
            reject('As senhas não coincidem!')

        if (!form.get('senha')) 
            reject('A senha deve ser informada!')

        if (!form.get('email'))
            reject('O E-mail deve ser informado!')

        if (!form.get('cnpj')) 
            reject('O CNPJ deve ser informado!')

        if (!form.get('image')) 
            reject('Insira uma imagem para a ONG!')

        resolve();
    })
}

async function cadastrar() {

    const formData = new FormData()

    formData.append('nome', document.getElementById('nome').value)
    formData.append('email', document.getElementById('email').value)
    formData.append('senha', document.getElementById('senha').value)
    formData.append('confirmarSenha', document.getElementById('confirmarSenha').value)
    formData.append('telefone', document.getElementById('telefone').value)
    formData.append('rua', document.getElementById('rua').value)
    formData.append('cnpj', document.getElementById('cnpj').value)
    formData.append('website', document.getElementById('website').value)
    formData.append('descricao', document.getElementById('descricao').value)
    formData.append('estado', document.getElementById('estado').value)
    formData.append('numero', document.getElementById('numero').value)
    formData.append('cidade', document.getElementById('cidade').value)
    formData.append('image', document.getElementById('imagemInput')?.files[0] ?? "")

    validateForm(formData).then(() => {
        axios.post('http://152.67.41.48:3000/api/ong', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
          //console.log('Response:', response.data);
          window.location.href = "http://ongweb.social/";
        })
        .catch(res => {
            console.log(res)
            fireErrorMessage(res.response.data.error)
        });
    }).catch(error => fireErrorMessage(error))
}