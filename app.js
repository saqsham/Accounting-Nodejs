const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./config/mongoose')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("> db connected");
});

// routes
const company = require('./routes/company')
const mainRouter = require('./routes/index');
const invoice = require('./routes/invoice');
const item = require('./routes/item');
const party = require('./routes/party');
const user = require('./routes/user');

// express, structure define
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views/')
const partialsPath = path.join(__dirname, './views/partials/')

//use sessions for tracking logins


//check in db

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
}));

// parse incoming requests
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use('/company', express.static(publicDirectoryPath))
app.use('/invoice', express.static(publicDirectoryPath))
app.use('/item', express.static(publicDirectoryPath))
app.use('/party', express.static(publicDirectoryPath))
app.use('/user', express.static(publicDirectoryPath))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
// app.use(cookieParser());

// routes
app.use('/company', company);
app.use('/', mainRouter);
app.use('/invoice', invoice);
app.use('/item', item);
app.use('/party', party);
app.use('/user', user);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//      next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//      res.status(err.status || 500);
//      res.send(err.message);
// });

module.exports = app;