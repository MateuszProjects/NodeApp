const mysql = require('mysql');
const expess = require('express');
const sequelize = require('sequelize');
const crypto = require('crypto');
const router  = expess.Router();

router.get('/', (req, res)=>{
    res.send('działa user');
});

module.exports = router;