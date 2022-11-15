const { Router } = require('express');
const router = Router();
const { client } = require('./db.js');

const connectDB = async() => {
    await client.connect();
    console.log("Connected");
};

connectDB();

router.get('/data', async(req, res) => {
    // Authorize request
    if (!(req.body.secret_key === process.env.SECRET_KEY)) return res.status(401).json({message: 'Unauthorized request'});
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

router.get('/data/:id', async(req, res) => {
    // Authorize request
    if (!(req.body.secret_key === process.env.SECRET_KEY)) return res.status(401).json({message: 'Unauthorized request'});
    try {
        // Fetch row from table Measurements where id is equal to id parameter
        const id = req.params.id;
        const data = await client.query(`SELECT * FROM Measurements WHERE id < $1 AND id > $2`, [id+1, id-1]);
        return res.json(data).send();
    } catch(err) {
        // Log and send error to client
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

router.post('/data', async (req, res) => {
    if (!(req.body.secret_key === process.env.SECRET_KEY)) return res.status(401).json({message: 'Unauthorized request'});
    try {
        const { lon, lat } = req.body;
        const timestamp = new Date();
        const type = "a";
        const id = Math.floor(Math.random()*10);
        const data = [lon, lat, timestamp, type];
        await client.query(`INSERT INTO Measurements VALUES(DEFAULT, $1, $2, $3, $4)`, data);
        return res.status(200).send(data);
    } catch(err) {
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

router.delete('/data', (req, res) => {
    res.send("Delete");
});

module.exports = router;
