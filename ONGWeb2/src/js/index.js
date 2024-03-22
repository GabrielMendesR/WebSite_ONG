var ong_list = []

window.onload = function() {
  const token = localStorage.getItem('token');
  if(token) {
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('register-button').textContent = 'Editar Minha ONG';
    document.getElementById('register-button').href = 'editar-ong.html';

    const li = document.createElement('li');
    li.innerHTML = `
        <a id="login-button" class="logout-btn" onclick="logout()">Sair</a>
      `
    document.getElementById('header-fields').prepend(li)
  }
  getAllOngs()

};

function logout() {
  localStorage.removeItem('token')
  location.reload() 
}


function listOngs() {

  const container = document.getElementById('ongs-container');

  ong_list.forEach(ong => {


    const div = document.createElement('div');

    // Set div content      is-revealing
    div.innerHTML = `
      <div class="feature">
      <a href='home-page.html?id=${ong.id}'> <h4 class="feature-title h3-mobile">${ong.name}</h4> </a>
        <div class="feature-inner">
            <div class="feature-icon">
              <img class="ong-icon" src="${ong.main_image_url}" alt="Imagem Ong">
            </div>
          <p class="text-sm">${ong.description}</p>
          <a href="${ong.url}" target="_blank">Website</a>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function getAllOngs() {
  axios.get('http://localhost:3000/api/ong/')
  .then(response => {
    console.log('Response:', response.data);
    ong_list = response.data.data
    listOngs()
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

