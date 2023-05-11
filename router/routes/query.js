const { Router } = require('express');
const { client } = require('../../db.js');
const query = Router();

query.post('/', async (req, res) => {
    try {
        // Get x acceleration and segment id from request body
        const query = req.body.query;
        const resp = await client.query(query);
        return res.status(201).send(resp);
        
    } catch(err) {
        console.error(err);
        return res.status(400).json({message: err.message});
    }
});

module.exports = query;

