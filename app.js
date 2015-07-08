var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var env = require('node-env-file');

var MongoURI = process.env.MONGO_URI || 'mongodb://localhost/cutup';
mongoose.connect(MongoURI, function(err, res) {
    if(err) {
        console.log('ERROR connecting to: ' + MongoURI + '. ' + err);
    } else {
        console.log('MongoDB connected successfully to ' + MongoURI);
    }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'cutup',
  resave: true,
  saveUninitialized: false
}))
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/account');
passport.use(Account.createStrategy());

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', routes);
app.use('/users', users);
app.use('/auth/', auth);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/** genius api **/
var token = env(__dirname + '/.env') || process.env.GENIUS_ACCESS_TOKEN;
var searchQuery = 'this is how we do it';
// Instantiate a Genius instance:
var Genius = require("node-genius");
var geniusClient = new Genius(process.env.GENIUS_ACCESS_TOKEN);

// Call functions on that instance:

geniusClient.search(searchQuery, function (error, results) {
  if (error)
    console.error("Whops. Something went wrong:", error);
  else
    var jsonResults = JSON.parse(results);
    jsonResults.response.hits.forEach(function(h){
      console.log(h.result.title + ' by ' + h.result.primary_artist.name);
    });

    // console.log("Hoorah. Here is the song: ", results);
});






module.exports = app;
