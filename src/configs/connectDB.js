'use strict';
const mysql = require('mysql2/promise');

console.log("Creating connection pool...");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'dbmovie',
    // password: 'password'
})

module.exports = db