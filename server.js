var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/data');
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
app.use(require('./routes'));


app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: ["l023f2oginsdlkbjenrbuerlibun34gunbo4g2"]
}))

/*app.use(session({secret:"asdflkj",
                saveUninitialized: true,
                resave: true,
                cookie: {secure: false}}));
*/

//maybe import below from separate file eventually
app.use(passport.initialize());
app.use(passport.session());


//done from new strategy function callbacks leads to this function which stores
//in cookies
passport.serializeUser((user, done)=>{
  console.log("serialized")
  done(null,user.id);
})

passport.deserializeUser((id, done)=>{
  db.findById(id).then((user)=>{
    console.log("deserialized")
    done(null,user)
  })
})

passport.use(new TwitterStrategy({
  consumerKey: "SHb2WIKszdaca91mqwMIwd45D",
consumerSecret: "3MD1zRSN2dJjqeI5nRy44BaSm01YqYM5d5HpfOQmur1ejVKTYD",
callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
},
function(token, tokenSecret, profile, done) {
//Callback... Finds current profile if exists else it creates new.
    db.findOne({twitterId: profile.id}).then((currentUser)=>{
      if(currentUser){
        console.log("Already a user");
        done(null,currentUser);
      }
      else{
        new db({
          username: profile.username,
          twiterId: profile.id,
          pints: []
        }).save().then((newUser)=>{
          console.log("User created: "+newUser);
          done(null,newUser);
        });
      }
    })

}
))


app.get('/auth/twitter',
  passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, comes here. Can use req.user to access
      //  user object
      res.send(req.user);
      res.redirect('/');
    });

    app.get('/auth/logout',(req,res)=>{
      req.logout();
    })

app.listen(3000, ()=>{
  console.log('Server On')
})
