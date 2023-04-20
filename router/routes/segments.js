const { Router } = require('express');
const segments = Router();

// Get all data
segments.get('/', async(req, res) => {
    // Authorize request
    if(!req.headers.authorization) return res.status(403).json({message: 'No authorization header provided'});
    if(req.headers.authorization != 'Basic YXhlbDEyMw==') return res.status(401).json({message: 'Unauthorized request'});
    try {
        // Fetch all rows from table Segments
        const data = await client.query('SELECT * FROM Segments');
        return res.json(data.rows).send();
    } catch(err) {
        // Log and send error to client
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

// Get data with id
segments.get('/:id', async(req, res) => {
    // Authorize request
    if(!req.headers.authorization) return res.status(403).json({message: 'No authorization header provided'});
    if(req.headers.authorization != 'Basic YXhlbDEyMw==') return res.status(401).json({message: 'Unauthorized request'});
    try {
        // Fetch row from table Segments where id is equal to request id parameter
        const id = parseInt(req.params.id);
        const data = await client.query(`SELECT * FROM Segments WHERE id < $1 AND id > $2`, [id+1, id-1]);
        // Send rows
        return res.json(data).send();
    } catch(err) {
        // Log and send error to client
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

// Add data
segments.post('/', async (req, res) => {
    // Authorize request
    if(!req.headers.authorization) return res.status(403).json({message: 'No authorization header provided'});
    if(req.headers.authorization != 'Basic YXhlbDEyMw==') return res.status(401).json({message: 'Unauthorized request'});
    try {
        // Get longitude and latitude from request body
        const { lon, lat, type} = req.body;
        const timestamp = new Date();
        const data = [lon, lat, timestamp, type];
        // Insert new row with data into table Segments
        await client.query(`INSERT INTO Segments VALUES(DEFAULT, $1, $2, $3, $4)`, data);
        return res.status(200).send(data);
    } catch(err) {
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

// Delete data
segments.delete('/:id', async(req, res) => {
    // Authorize request
    if(!req.headers.authorization) return res.status(403).json({message: 'No authorization header provided'});
    if(req.headers.authorization != 'Basic YXhlbDEyMw==') return res.status(401).json({message: 'Unauthorized request'});
    try {
        // Fetch row from table Segments where id is equal to request id parameter and delete it
        const id = parseInt(req.params.id);
        const data = await client.query(`DELETE FROM Segments WHERE id < $1 AND id > $2`, [id+1, id-1]);
        // Send rows
        return res.json(data.rows).send();
    } catch(err) {
        // Log and send error to client
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

module.exports = segments;