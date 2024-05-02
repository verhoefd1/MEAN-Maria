const mariadb = require("mariadb")

const pool = mariadb.createPool({
    host: 'docker-mariadb',
    user: 'root',
    password: 'asjdfpoiajsdadsfipjoiasjdf',
    database: 'food'
})

module.exports = pool;