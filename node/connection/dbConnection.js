const mysql = require('mysql2');

const connection = mysql.createConnection({
    // host: 'localhost',
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'node_project',
    port: 3306
});

connection.connect((error) => {
    if(error) {
        console.log('Failed to connect to the database:: ', JSON.stringify(error, undefined, 2)); }
});

module.exports = connection;