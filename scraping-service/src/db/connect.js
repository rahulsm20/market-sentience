const {Pool} = require('pg')
require('dotenv').config();
const connectionString = process.env.POSTGRES_URL;
const pool = new Pool({
    connectionString,
});

module.exports= {pool}