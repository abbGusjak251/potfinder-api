const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
    res.send("Get");
});

router.post('/data', (req, res) => {
    res.send("Post");
});

router.delete('/data', (req, res) => {
    res.send("Delete");
});

module.exports = router;
