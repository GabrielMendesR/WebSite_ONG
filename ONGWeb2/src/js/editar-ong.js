document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();
});


window.onload = function() {
    getOngById()
};

function getOngById() {
    const urlParams = new URLSearchParams(window.location.search);
    const ongId = urlParams.get('id');

    axios.get('http://localhost:3000/api/ong/' + ongId)
    .then(response => {
        console.log('Response:', response.data);
        resolveOng(response.data[0])
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function resolveOng(ong) {
    document.getElementById('telefone').value = ong.phone_number
    document.getElementById('email').value = ong.email
    document.getElementById('descricao').value = ong.description
    document.getElementById('website').value = ong.url
    document.getElementById('estado').value = ong.address_state
    document.getElementById('rua').value = ong.address_street
    document.getElementById('numero').value = ong.address_number
    document.getElementById('cidade').value = ong.address_city
    
    document.getElementById('senha').value = ong.password //revisar esse fluxo, não é o correto
    document.getElementById('confirmarSenha').value = ong.password
}

function formatarTelefone(input) {
    const digitos = input.value.replace(/\D/g, '');

    let telefoneFormatado = '';
    if (digitos.length > 0) {
        telefoneFormatado = '(' + digitos.substring(0, 2);
        if (digitos.length > 2) {
            telefoneFormatado += ') ' + digitos.substring(2, 7);
        }
        if (digitos.length > 6) {
            telefoneFormatado += '-' + digitos.substring(7, 11);
        }
    }
    input.value = telefoneFormatado;
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

function deleteOng() {
    Swal.fire({
        title: "Tem certeza?",
        text: "Sua ONG será excluída permanentemente do sistema !",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        cancelButtonText: 'Cancelar',
        confirmButtonText: "Sim, quero excluir",
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
        
        if (form.get('senha') !== form.get('confirmarSenha')) 
            reject('As senhas não coincidem!')

        if (!form.get('senha')) 
            reject('A senha deve ser informada!')

        if (!form.get('email'))
            reject('O E-mail deve ser informado!')

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
    formData.append('image', document.getElementById('imagemInput')?.files[0] ?? "")

    const token = localStorage.getItem('token');
    
    validateForm(formData).then(() => {
        axios.put('http://localhost:3000/api/ong/update', formData, { 
            headers: {
                'Content-Type': 'multipart/form-data',
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