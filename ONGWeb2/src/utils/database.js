const mysql = require('mysql');

module.exports = {
    createDatabase,
    createOng,
    getAllOngs,
    checkLogin,
    includeOngImages,
    getAllImages
};

const pool = mysql.createPool({
    connectionLimit: 10, 
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'ong_web' //comentar essa linha na criação do database
});

const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ong_web;`

const createTableQuery = `CREATE TABLE IF NOT EXISTS ong_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(255),
    phone_number varchar(255),
    email varchar(255),
    password varchar(255),

    code varchar(255),
    url varchar(255),
    
    address_state varchar(255),
    address_street varchar(255),
    address_number varchar(255),
    address_city varchar(255)
);`

const createImagesTableQuery = `CREATE TABLE IF NOT EXISTS ong_images_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_path varchar(255),
    id_ong INT,
    FOREIGN KEY (id_ong) REFERENCES ong_list(id)
);`

function createDatabase() {
    pool.query(createDatabaseQuery, (error, results, fields) => {
        if (error) {
            console.error('Error creating database:', error);
            return;
        }
        console.log('Database created successfully');
      
        pool.query('USE ong_web;', (error) => {
            if (error) {
                console.error('Error selecting database:', error);
                return;
            }
            console.log('Database selected successfully');
            createTables();
        });
    });
}

function createTables() {
    pool.query(createTableQuery, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
        console.log('Query results:', results);
    });

    pool.query(createImagesTableQuery, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
        console.log('Query results:', results);
    });
}

function getAllImages() {
    return new Promise((resolve, reject) => { {
        pool.query('SELECT * FROM ong_images_list', (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                reject(error);
            }
            //console.log('Query results:', results);
            resolve(results);
        });
    }})
}


function getAllOngs() {
    return pool.query('SELECT * FROM ong_list', (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
        console.log('Query results:', results);
    });
}
 
function checkLogin(credentials) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT * FROM ong_list
        WHERE email = '${credentials.email}' AND password = '${credentials.password}'`
        pool.query(query, (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                reject(error);
            }
            console.log("results:",results)
            resolve(results);
        });
    })
}

function createOng(ongObj) {
    const query = `
        INSERT INTO ong_list(
            name,
            phone_number,
            email,
            password,
            code,
            url,
            address_state,
            address_street,
            address_number,
            address_city
        ) VALUES (
            ${ongObj.nome}, 
            '${ongObj.telefone}', 
            '${ongObj.email}',
            ${ongObj.senha},
            '${ongObj.cnpj}',
            '${ongObj.website}',
            ${ongObj.estado},
            ${ongObj.rua}, 
            ${ongObj.numero},
            ${ongObj.cidade}
        );
    `
    pool.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
        console.log('Query results:', results);
    });
}


function includeOngImages(ongId, images) {

    console.log(images)
    
    //const values = images.map(image => `('${image}', ${ongId})`).join(','); caso seja array de imagens

    const query = `
        INSERT INTO ong_images_list(
            image_path,
            id_ong
        ) VALUES ('${images}', ${ongId});
    `
    pool.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
        console.log('Query results:', results);
    });
}