const mysql = require('mysql');
const config = require('../config/database');

// Connect to database
const db = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
})

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});

// Helper function to promisify MySQL queries
const query = (sql, args) => {
    return new Promise((resolve, reject) => {
        db.query(sql, args, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = { query };