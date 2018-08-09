const express = require('express');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const user = require('./routes/user')
const hbs = require('hbs');

const app = express();



app.use(session({
    name: 'JSESSION',
    secret: 'MYSECRETISVERYSECRET',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true
    }
}));

app.set('views', path.join(__dirname, 'views'));


app.use('/user', user);

app.get('/', (req, res)=>{
    res.send('działa index');
});

app.get('*', (req, res)=>{
    res.send("error");
});

const port = process.env.port || 4200;

app.listen(port, (req, res)=>{
    console.log('running on port 4200');
});

