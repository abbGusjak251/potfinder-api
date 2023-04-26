const { Router } = require('express');
const router = Router();
const env_secret = process.env.SECRET_KEY || 'secret';
const secret = new Buffer(env_secret, 'ascii').toString('base64');



const measurements = require('./routes/measurements');
const segments = require('./routes/segments');

router.use((req, res, next) => {
    // Authorize request
    console.log('Basic ' + secret)
    console.log(secret, env_secret);
    if(!req.headers.authorization) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({message: 'No authorization header provided'});
    }
    if(req.headers.authorization !== `Basic ${secret}`) return res.status(401).json({message: 'Unauthorized request'});
    next();
});

router.use('/measurements', measurements);
router.use('/segments', segments);

module.exports = router;
