'use strict'
var app = require('express')();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var User = require('./model/Users');
var session = require('express-session');
var authRoutes = require('./routes/auth');
var router = require('./routes/routes');
var MongoStore = require('connect-mongo')(session);

var port = process.env.API_PORT || 3001;  
var session_sec = process.env.SESSION_SEC || 'work_hard'

var mongoDB = 'mongodb://jsadler:Forward_55@127.0.0.1:27017/dsentrdb?authSource=admin';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', () => {
    console.log('db connected');
});

app.use(session({
    secret: session_sec,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));
 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

app.use(function(req, res, next) {  
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'); 
    res.setHeader('Cache-Control', 'no-cache'); 
    next();  
});

app.use('/api', router);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(port, () => {
    console.log(`api running on port ${port}`);
});
