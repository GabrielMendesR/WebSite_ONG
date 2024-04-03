var ong_list = []

window.onload = function () {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = parseJwt(token)
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('register-button').textContent = 'Editar Minha ONG';
    document.getElementById('register-button').href = 'editar-ong.html?id=' + decoded.uid;

    const li = document.createElement('li');
    li.innerHTML = `
        <a id="login-button" class="logout-btn" onclick="logout()">Sair</a>
      `
    document.getElementById('header-fields').prepend(li)
  }
  getAllOngs()
  
};

function getProfileAvatar() {
  const token = localStorage.getItem('token');
  decoded = parseJwt(token)
  if(!decoded) return
  const ong = ong_list.find(ong => ong.id == decoded.uid)
  const avatar = document.getElementById('profile-avatar')
  const name = document.getElementById('profile-name')
  avatar.src = ong.main_image_url
  avatar.style.display = "block"
  name.innerText = ong.name
}

function parseJwt (token) {
  if(!token) return
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

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
      <a href='home-page.html?id=${ong.id}'> <h4 class="feature-title h3-mobile">${ong.name}</h4> 
        <div class="feature-inner">
            <div class="feature-icon">
              <img class="ong-icon" src="${ong.main_image_url}" alt="Imagem Ong">
            </div>
          <a href="${ong.url}" target="_blank">Website</a>
        </div>
      </a>
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
      getProfileAvatar()
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

