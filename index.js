const express = require('express');
const app = express();
const routes = require('./routes.js');
const cors = require('cors');

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
});

app.use('/api', routes);

app.get('/api', (req, res) => {
    res.send("Welcome to Potfinder API");
});

app.listen(process.env.PORT || 3000, () => console.log("Port is " + process.env.PORT));