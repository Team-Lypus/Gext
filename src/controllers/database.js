const { Pool } = require("pg")

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    database: 'gext'
})

module.exports = pool;