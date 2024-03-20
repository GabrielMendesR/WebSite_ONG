var ong_list = []

window.onload = function() {
  fetch('../ui/header/header.html')
      .then(response => response.text())
      .then(html => {
          document.getElementById('header').innerHTML = html;
  });
  getAllOngs()
};

window.addEventListener('scroll', function() {

  var div = document.getElementById('ong-card');

  if (isElementInViewport(div)) {

      div.addEventListener('click', function() {
        
        var url = div.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }  
      
      });

      //div.style.display = 'block';

      // Remove the scroll listener to prevent multiple listeners
      window.removeEventListener('scroll', arguments.callee);
  }
});

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function listOngs(ongs) {

  // Get the container div element
  const container = document.getElementById('ongs-container');

  ong_list.forEach(item => {

    const originalElement = document.getElementById('ong-card');
    const nomeOng = document.getElementById('nome_ong');
    // Create a new div element
    console.log("original:",originalElement)

    console.log("original:",originalElement)
    const div = document.createElement('div');
    nomeOng.textContent = item.name
    // Set the text content of the div to the current item
    div.textContent = item.name;

    // Append the div to the container
    container.appendChild(originalElement);
  });

    //var container = document.getElementById('ongs-container');
    
    // Get the original element
    var originalElement = document.getElementById('ong-card');
    
    // Clone the original element
    var clone = originalElement.cloneNode(true);
    
    // Append the clone to the container
    container.appendChild(clone);
}

function getAllOngs() {
  axios.get('http://localhost:3000/api/ong/')
  .then(response => {
    console.log('Response:', response.data);
    ong_list = response.data.data
    listOngs(response.data)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

