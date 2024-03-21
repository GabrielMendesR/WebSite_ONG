var ong_list = []

window.onload = function() {
  fetch('../ui/header/header.html')
      .then(response => response.text())
      .then(html => {
          document.getElementById('header').innerHTML = html;
  });
  getAllOngs()
};


function listOngs() {

  const container = document.getElementById('ongs-container');

  ong_list.forEach(ong => {


    const div = document.createElement('div');

    // Set div content      is-revealing
    div.innerHTML = `
      <div class="feature">
        <h4 class="feature-title h3-mobile">${ong.name}</h4>
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

