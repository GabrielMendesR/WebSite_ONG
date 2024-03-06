function listOngs() {
    
    var container = document.getElementById('ongs-container');
    
    // Get the original element
    var originalElement = document.getElementById('ong-card');
    
    // Clone the original element
    var clone = originalElement.cloneNode(true);
    
    // Append the clone to the container
    container.appendChild(clone);
  }