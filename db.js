// db.js
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

const connectDB = async() => {
    await client.connect();
    console.log("Connected");
};

connectDB();

module.exports = { client };