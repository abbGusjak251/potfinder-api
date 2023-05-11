const { Router } = require('express');
require('dotenv').config();
const router = Router();

// Import secret key from environment variables and convert it to base64
const env_secret = process.env.SECRET_KEY || 'secret';
const secret = Buffer.from(env_secret, 'ascii').toString('base64');

const measurements = require('./routes/measurements');
const segments = require('./routes/segments');
const query = require('./routes/query');

// Middleware function which makes sure that user is authenticated
router.use((req, res, next) => {
    // Authorize request
    if(!req.headers.authorization) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({message: 'No authorization header provided'});
    }
    if(req.headers.authorization !== `Basic ${secret}`) return res.status(401).json({message: 'Unauthorized request'});
    next();
});

// Use API routes
router.use('/measurements', measurements);
router.use('/segments', segments);
router.use('/query', query);

module.exports = router;
