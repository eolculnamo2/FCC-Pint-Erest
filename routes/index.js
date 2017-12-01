var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var db = require('../db/data');
var mongoose = require('mongoose');
var passport = require('passport')
var server = require('../server')
var users = require('./users')
var router = express.Router();
var app = express();

/*
router.get('/',(req,res)=>{
console.log(req.user)
  if(req.user){
  res.render("index",{
      user: req.user.username,
      pints: req.user.pints
  })
}
else{
  res.render('index',{
    user: "",
    pints: []
  })
}
})
*/


module.exports = router;
