const mysql = require('mysql');
const expess = require('express');
const crypto = require('crypto');
const router  = expess.Router();

router.get('/', (req, res)=>{
    res.send('działa index');
});

module.exports = router;