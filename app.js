const express = require('express');
const createError = require('http-errors');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');

// Routes:
const user = require('./routes/user')
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
        secure: true
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

const port = process.env.port || 4200;

app.listen(port, (req, res)=>{
    console.log('running on port 4200');
});

