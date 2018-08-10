const express = require('express');
const createError = require('http-errors');
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const logger = require('morgan');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');


// Routes:
const user = require('./routes/user');

// end Routes

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
    name: 'JSESSION',
    secret: 'MYSECRETISVERYSECRET',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 60000
    }
}));
// registry use:
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// Depenency:
app.use('/user', user);

// index page:
app.get('/', (req, res)=>{
    res.send('działa index');
});

// 404 
app.use(function(req, res, next){
    next(createError(404));
});

// 500
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });  

app.post('/api/posts', verifyToken, (req, res)=>{
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post created...',
                authData
            });
        }
    })
});

app.post('/api/login', (req, res)=>{
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token) =>{
        res.json({
            token
    });
  });    
});

// Verify Token:
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

const port = process.env.port || 4200;

app.listen(port, (req, res)=>{
    console.log('running on port 4200');
});
