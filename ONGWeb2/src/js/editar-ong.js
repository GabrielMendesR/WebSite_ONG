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

function deleteOng() {
    Swal.fire({
        title: "Tem certeza?",
        text: "Sua ONG será excluída permanentemente do sistema !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, quero excluir",
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            const token = localStorage.getItem('token');
            axios.delete('http://localhost:3000/api/ong/', { 
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                localStorage.removeItem('token')
                console.log('Response:', response.data);
                Swal.fire({
                    title: "Sucesso!",
                    text: "Sua ONG foi removida do sistema.",
                    icon: "success",
                }).then((result) => {
                    window.location.href = "/ONGWeb2/src/ui/";
                })
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      });
}

function validateForm(form) {
    return new Promise((resolve, reject) => {
        console.log(form)
        
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

async function update() {

    const formData = new FormData()

    formData.append('email', document.getElementById('email').value),
    formData.append('senha', document.getElementById('senha').value),
    formData.append('confirmarSenha', document.getElementById('confirmarSenha').value),
    formData.append('telefone', document.getElementById('telefone').value),
    formData.append('rua', document.getElementById('rua').value),
    formData.append('website', document.getElementById('website').value),
    formData.append('descricao', document.getElementById('descricao').value),
    formData.append('estado', document.getElementById('estado').value),
    formData.append('numero', document.getElementById('numero').value),
    formData.append('cidade', document.getElementById('cidade').value)

    if (formData.get('senha') !== formData.get('confirmarSenha')) { 
        Swal.fire({
            backdrop: false,
            width: '200px',
            position: "top-end",
            icon: "error",
            text: "As senhas não coincidem!",
            showConfirmButton: false,
            timer: 1500
        });
        return
     } 

    const token = localStorage.getItem('token');
    
    validateForm(formData).then(() => {
        axios.put('http://localhost:3000/api/ong/update', formData, { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }).catch(error => fireErrorMessage(error))
}