var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db/data');
var indexRoute = require('./index');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieSession = require('cookie-session')
var TwitterStrategy = require('passport-twitter').Strategy;
var router = express.Router();
var app = express();


router.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: ["l023f2oginsdlkbjenrbuerlibun34gunbo4g2"]
}))

//maybe import below from separate file eventually
router.use(passport.initialize());
router.use(passport.session());


//done from new strategy function callbacks leads to this function which stores
//in cookies
passport.serializeUser((user, done)=>{
  console.log("serialized" +user.id)
  done(null,user.id);
})

passport.deserializeUser((id, done)=>{
  var account = db.Account
  account.findById(id).then((user)=>{
    console.log("deserialized")
    done(null,user)
  })
})

passport.use(new TwitterStrategy({
  consumerKey: "SHb2WIKszdaca91mqwMIwd45D",
consumerSecret: "3MD1zRSN2dJjqeI5nRy44BaSm01YqYM5d5HpfOQmur1ejVKTYD",
callbackURL: "https://spicy-windscreen.glitch.me/auth/twitter/callback"
},
function(token, tokenSecret, profile, done) {
  var account = db.Account
//Callback... Finds current profile if exists else it creates new.
    account.findOne({twitterId: profile.id}).then((currentUser)=>{
      if(currentUser){
        console.log("Already a user");
        done(null,currentUser);
      }
      else{
        new account({
          username: profile.username,
          twitterId: profile.id,
          pints: []
        }).save().then((newUser)=>{
          console.log("User created: "+newUser);
          done(null,newUser);
        });
      }
    })

}
))


//passport.serializeUser(db.serializeUser())
//passport.deserializeUser(db.deserializeUser());

//redirects to twitter for approval
//callback
router.get('/auth/twitter',
  passport.authenticate('twitter'));

  router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {

      // Successful authentication, comes here. Can use req.user to access
      //  user object
      res.redirect("/")

    });

    router.get('/auth/logout',(req,res)=>{

      req.logout();
      res.redirect('/')
    })

    router.get('/myWall', (req,res)=>{
      if(req.user){
      res.render("myWall",{
          user: req.user.username,
          pints: req.user.pints
      })
    }
    else{
      res.render('myWall',{
        user: "",
        pints: []
      })
    }
    })

  router.get('/',(req,res)=>{
    var uname = "";
    /* Below is an attempt at checking for user Login..
    Causes Error
    if(req.user.username){
      uname = req.user.username;
    }
    */
      var accounts = db.Account
      var allPints = [];
      accounts.find({}).exec((err,result)=>{
        result.forEach((y)=>{
          y.pints.forEach((x,i)=>{
            var wholePint = {
              title: x.title,
              image: x.image
            }
            allPints.push(wholePint)
          })
          })
          console.log(allPints)
          res.render("index",{
            user: uname,
            pints: allPints
          })


      })
    })




    router.post('/addPint',(req,res)=>{
        console.log(req.user)
      var account = db.Account;
      //var pint = db.Pint;
     var newPint = {
        title: req.body.title,
        image: req.body.image
      }

      account.findOneAndUpdate({twitterId: req.user.twitterId},
                      {$push: {pints: newPint}},{new: true},((err,result)=>{

                        res.render("index", {
                        user: req.user.username,
                        pints: result.pints
                      })

                      }))
    })

    router.post('/delete', (req,res)=>{
      var account = db.Account;
      var index = req.body.deleter;
      console.log(index);
      account.findOneAndUpdate({twitterId: req.user.twitterId},
         {$pull: {pints: {image: index}}},{new: true},(err,result)=>{
        res.render("myWall",{
          user: req.user.username,
          pints: result.pints
        })
      })
    })

  module.exports = router;
