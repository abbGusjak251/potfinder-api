const { Router } = require('express');
const { client } = require('../../db.js');
const segments = Router();

// Get all data
segments.get('/', async(req, res) => {
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
    try {
        // Get longitude and latitude from request body
        const inserts = req.body.inserts;
        const ids = inserts.map(async(insert) => {
            const { start_lat, start_lon, end_lat, end_lon } = insert;
            const timestamp = new Date();
            const data = [start_lat, start_lon, end_lat, end_lon, timestamp];
            // Insert new row with data into table Measurements
            const resp = await client.query(`INSERT INTO Segments VALUES(DEFAULT, $1, $2, $3, $4, $5) RETURNING id`, data);
            console.log(resp.rows[0].id)
            return resp.rows[0];
        });
        const out = await Promise.all(ids);
        return res.status(200).send(out);
    } catch(err) {
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

// Delete data
segments.delete('/:id', async(req, res) => {
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