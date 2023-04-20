const { Router } = require('express');
const router = Router();
const { measurements } = require('./routes/measurements');
const { segments } = require('./routes/segments');
const { client } = require('../db.js');

const connectDB = async() => {
    await client.connect();
    console.log("Connected");
};

connectDB();

router.use(function(req, res, next) {
    // Authorize request
    if(!req.headers.authorization) return res.status(403).json({message: 'No authorization header provided'});
    if(req.headers.authorization != `Basic ${process.env.SECRET_KEY}`) return res.status(401).json({message: 'Unauthorized request'});
    next();
});



module.exports = router;
