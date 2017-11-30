var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/data');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieSession = require('cookie-session')
var TwitterStrategy = require('passport-twitter').Strategy;
var router = express.Router();
var app = express();

//passport.serializeUser(db.serializeUser())
//passport.deserializeUser(db.deserializeUser());


//redirects to twitter for approval


//callback



  module.exports = router;
