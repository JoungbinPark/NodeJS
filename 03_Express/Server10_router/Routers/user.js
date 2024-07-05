const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("<h1>Hello, Express router - user - '/' </h1>")
});

router.get('/search', (req, res)=>{
    res.send("<h1>Hello, Express router - user - '/search' </h1>")
});

module.exports = router;