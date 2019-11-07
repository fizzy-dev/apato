const mysql = require('mysql');

const env = process.env.NODE_ENV || 'development';
const {
    host,
    user,
    password,
    name
} = require('../configs/config.json')[env].database;

const database = mysql.createConnection({
    host,
    user,
    password,
    database: name
});

database.connect(function(err) {
    if (err) throw err;
});

module.exports = database;