const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  // Send the response body
  res.end('Aplicação rodando!\n');
});

// Specify the port number to listen on
const port = 3000;

// Start the server and make it listen on the specified port
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});