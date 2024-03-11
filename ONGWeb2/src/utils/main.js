const mysql = require('mysql');
const http = require('http');

const pool = mysql.createPool({
    connectionLimit: 10, 
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'ong_web'
});


const createdatabaseQuery = `CREATE DATABASE IF NOT EXISTS ong_web;`

const createTableQuery = `CREATE TABLE IF NOT EXISTS ong_list (
    name varchar(255),
    address varchar(255)
);`

pool.query(createdatabaseQuery, (error, results, fields) => {
    if (error) {
        console.error('Error executing query:', error);
        return;
    }
    console.log('Query results:', results);
});


pool.query(createTableQuery, (error, results, fields) => {
    if (error) {
        console.error('Error executing query:', error);
        return;
    }
    console.log('Query results:', results);
});

pool.query('SELECT * FROM ong_list', (error, results, fields) => {
    if (error) {
        console.error('Error executing query:', error);
        return;
    }
    console.log('Query results:', results);
});

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