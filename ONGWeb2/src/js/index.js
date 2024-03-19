window.onload = function() {
  fetch('../ui/header/header.html')
      .then(response => response.text())
      .then(html => {
          document.getElementById('header').innerHTML = html;
      });
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

function listOngs() {
    
    var container = document.getElementById('ongs-container');
    
    // Get the original element
    var originalElement = document.getElementById('ong-card');
    
    // Clone the original element
    var clone = originalElement.cloneNode(true);
    
    // Append the clone to the container
    container.appendChild(clone);
}