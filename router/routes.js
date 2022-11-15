const { Router } = require('express');
const router = Router();
const { client } = require('../db.js');

const connectDB = async() => {
    await client.connect();
    console.log("Connected");
};

connectDB();

// Get all data
router.get('/data', async(req, res) => {
    // Authorize request
    if(!req.headers.authorization) return res.status(403).json({message: 'No authorization header provided'});
    if(req.headers.authorization != 'Basic YXhlbDEyMw==') return res.status(401).json({message: 'Unauthorized request'});
    try {
        // Fetch all rows from table Measurements
        const data = await client.query('SELECT * FROM Measurements');
        return res.json(data).send();
    } catch(err) {
        // Log and send error to client
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

// Get data with id
router.get('/data/:id', async(req, res) => {
    // Authorize request
    if(!req.headers.authorization) return res.status(403).json({message: 'No authorization header provided'});
    if(req.headers.authorization != 'Basic YXhlbDEyMw==') return res.status(401).json({message: 'Unauthorized request'});
    try {
        // Fetch row from table Measurements where id is equal to request id parameter
        const id = parseInt(req.params.id);
        const data = await client.query(`SELECT * FROM Measurements WHERE id < $1 AND id > $2`, [id+1, id-1]);
        // Send rows
        return res.json(data.rows).send();
    } catch(err) {
        // Log and send error to client
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

// Add data
router.post('/data', async (req, res) => {
    // Authorize request
    if(!req.headers.authorization) return res.status(403).json({message: 'No authorization header provided'});
    if(req.headers.authorization != 'Basic YXhlbDEyMw==') return res.status(401).json({message: 'Unauthorized request'});
    try {
        // Get longitude and latitude from request body
        const { lon, lat } = req.body;
        const timestamp = new Date();
        const type = "a";
        const id = Math.floor(Math.random()*10);
        const data = [lon, lat, timestamp, type];
        // Insert new row with data into table Measurements
        await client.query(`INSERT INTO Measurements VALUES(DEFAULT, $1, $2, $3, $4)`, data);
        return res.status(200).send(data);
    } catch(err) {
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

// Delete data
router.delete('/data/:id', async(req, res) => {
    // Authorize request
    if(!req.headers.authorization) return res.status(403).json({message: 'No authorization header provided'});
    if(req.headers.authorization != 'Basic YXhlbDEyMw==') return res.status(401).json({message: 'Unauthorized request'});
    try {
        // Fetch row from table Measurements where id is equal to request id parameter
        const id = parseInt(req.params.id);
        const data = await client.query(`DELETE FROM Measurements WHERE id < $1 AND id > $2`, [id+1, id-1]);
        // Send rows
        return res.json(data.rows).send();
    } catch(err) {
        // Log and send error to client
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

module.exports = router;
