const { Router } = require('express');
const router = Router();
const secret = process.env.SECRET_KEY || 'secret';



const measurements = require('./routes/measurements');
const segments = require('./routes/segments');

router.use((req, res, next) => {
    // Authorize request
    console.log(`Basic ${secret.toString('base64')}`)
    if(!req.headers.authorization) return res.status(403).json({message: 'No authorization header provided'});
    if(req.headers.authorization != `Basic ${secret.toString('base64')}`) return res.status(401).json({message: 'Unauthorized request'});
    next();
});

router.use('/measurements', measurements);
router.use('/segments', segments);

module.exports = router;
