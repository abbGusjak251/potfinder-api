const { Router } = require('express');
const router = Router();
const secret = Buffer.from(process.env.SECRET_KEY || 'secret').toString("base64");



const measurements = require('./routes/measurements');
const segments = require('./routes/segments');

router.use((req, res, next) => {
    // Authorize request
    console.log(`Basic ${secret.toString('base64')}`)
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
