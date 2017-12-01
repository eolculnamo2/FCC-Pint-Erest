var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/data');
var indexRoute = require('./routes/index')
var usersRoute = require('./routes/users')
var mongoose = require('mongoose');
var passport = require('passport');
var cookieSession = require('cookie-session')
var TwitterStrategy = require('passport-twitter').Strategy;
var router = express.Router();
var app = express();

//middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", indexRoute);
app.use("/", usersRoute)



var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
