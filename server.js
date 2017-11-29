var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var db = require('./db/data');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var router = express.Router();
var app = express();

//middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(require('./routes'));
app.use(session({secret:"asdflkj",
                saveUninitialized: true,
                resave: true,
                cookie: {secure: false}}));

//maybe import below from separate file eventually
app.use(passport.initialize());
app.use(passport.session());

passport.use(new TwitterStrategy({
  consumerKey: "SHb2WIKszdaca91mqwMIwd45D",
consumerSecret: "3MD1zRSN2dJjqeI5nRy44BaSm01YqYM5d5HpfOQmur1ejVKTYD",
callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
},
function(token, tokenSecret, profile, cb) {
  console.log(profile.id)
  /*
db.findOrCreate({ twitterId: profile.id }, function (err, user) {
  return cb(err, user);
});
*/

}
))


//passport.serializeUser(db.serializeUser())
//passport.deserializeUser(db.deserializeUser());


//redirects to twitter for approval
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(profile)
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(3000, ()=>{
  console.log('Server On')
})
