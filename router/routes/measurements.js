const { Router } = require('express');
const { client } = require('../../db.js');
const measurements = Router();

const postMeasurements = (inserts) => {
    return new Promise((resolve, reject) => {
        let ids = [];
        inserts.forEach(async(insert, index) => {
            const { x, segment_id } = insert;
            const data = [x, segment_id];
            // Insert new row with data into table Measurements
            await client.query(`INSERT INTO Measurements VALUES(DEFAULT, $1, $2) RETURNING id`, data, (err, resp) => {
                if(err) {
                    reject(err);
                }
                console.log(resp.rows[0].id);
                ids.push(resp.rows[0].id);
            });
            console.log(ids)
        });
        resolve(ids);
    });
};

// Get all data
measurements.get('/', async(req, res) => {
    try {
        // Fetch all rows from table Measurements
        // await client.connect();
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
        const inserts = req.body;
        const ids = inserts.map(async(insert) => {
            const { x, segment_id } = insert;
            const data = [x, segment_id];
            // Insert new row with data into table Measurements
            const resp = await client.query(`INSERT INTO Measurements VALUES(DEFAULT, $1, $2) RETURNING id`, data);
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