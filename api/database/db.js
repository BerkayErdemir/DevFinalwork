const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "[password of user]",
    database: "database_players",
    host: "localhost",
    port: 5432
});

module.exports = pool;