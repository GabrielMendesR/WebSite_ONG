const mysql = require('mysql');

module.exports = {
    createOng,
    getAllOngs
};

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

function getAllOngs() {
    pool.query('SELECT * FROM ong_list', (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
        console.log('Query results:', results);
    });
}

function createOng(ongObj) {
    pool.query(`INSERT INTO ong_list VALUES (${ongObj.nome}, ${ongObj.endereco})`, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
        console.log('Query results:', results);
    });
}