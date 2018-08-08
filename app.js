const express = require('express');
const app = express();

const port = process.env.port || 4200;

app.listen(port, (req, res)=>{
    console.log('running on port 4200');
});

