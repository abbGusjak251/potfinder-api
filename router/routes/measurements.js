const { Router } = require('express');
const measurements = Router();

// Get all data
measurements.get('/', async(req, res) => {
    try {
        // Fetch all rows from table Measurements
        const data = await client.query('SELECT * FROM Measurements');
        return res.json(data.rows).send();
    } catch(err) {
        // Log and send error to client
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

// Get data with id
measurements.get('/:id', async(req, res) => {
    try {
        // Fetch row from table Measurements where id is equal to request id parameter
        const id = parseInt(req.params.id);
        const data = await client.query(`SELECT * FROM Measurements WHERE id < $1 AND id > $2`, [id+1, id-1]);
        // Send rows
        return res.json(data).send();
    } catch(err) {
        // Log and send error to client
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

// Add data
measurements.post('/', async (req, res) => {
    try {
        // Get x acceleration and segment id from request body
        const { x, segment_id } = req.body;
        const data = [x, segment_id];
        // Insert new row with data into table Measurements
        await client.query(`INSERT INTO Measurements VALUES(DEFAULT, $1, $2)`, data);
        return res.status(200).send(data);
    } catch(err) {
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

// Delete data
measurements.delete('/:id', async(req, res) => {
    try {
        // Fetch row from table Measurements where id is equal to request id parameter and delete it
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

module.exports = measurements;