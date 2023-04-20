const { Router } = require('express');
const router = Router();
const { measurements } = require('./routes/measurements');
const { segments } = require('./routes/segments');
const { client } = require('../db.js');

const connectDB = async() => {
    await client.connect();
    console.log("Connected");
};

connectDB();



module.exports = router;
