const express = require('express');
const app = express();
const routes = require('./router/routes.js');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
});

app.use('/api', routes);

app.get('/api', (req, res) => {
    res.send("<b>Welcome to Potfinder API</b>");
});

app.listen(process.env.PORT || 3000, () => console.log("Port is " + process.env.PORT));