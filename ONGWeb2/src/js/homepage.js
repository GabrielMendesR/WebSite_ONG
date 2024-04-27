window.onload = function() {
    getOngById()
};
  

function getOngById() {
    const urlParams = new URLSearchParams(window.location.search);
    const ongId = urlParams.get('id');

    axios.get('http://164.152.57.77:3000/api/ong/' + ongId)
    .then(response => {
        console.log('Response:', response.data);
        resolveOng(response.data[0])
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function resolveOng(ong) {
    document.getElementById('name-ong').innerText = ong.name
    document.getElementById('email-ong').innerText = ong.email
    document.getElementById('phone-ong').innerText = ong.phone_number
    document.getElementById('cnpj-ong').innerText = ong.code
    document.getElementById('description-ong').innerText = ong.description

    document.getElementById('ong-img').src = ong.main_image_url;
}