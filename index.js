const express = require('express');
const app = express();
const routes = require('./routes.js');

require('dotenv').config();

app.use(express.json());

app.use('/api', routes);

app.get('/api', (req, res) => {
    res.send("Welcome to Potfinder API");
});

app.listen(process.env.PORT, () => console.log("Port is " + process.env.PORT));