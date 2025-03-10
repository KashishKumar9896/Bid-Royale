const express = require('express')
const router = express.Router();
const path = require('path'); 
const route = require('../control/controlling');
router.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
router.get('/login',route.getlogin);
router.get('/register',route.getregister);
router.post('/login',route.postlogin);
router.post('/register',route.postregister);

router.get('/check-helmet', (req, res) => {
    res.json({
        headers: res.getHeaders() // Get all response headers
    });
});



module.exports = router;