var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var db = require('../db/data');
var mongoose = require('mongoose');
var passport = require('passport')

var router = express.Router();
var app = express();


router.get('/',(req,res)=>{
  res.render("index",{})
})



module.exports = router;
