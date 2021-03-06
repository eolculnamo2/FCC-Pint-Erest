var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//uri
var uri = "mongodb://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@ds235785.mlab.com:35785/singletempo";
//connect to mongoDB
mongoose.connect(uri)

mongoose.connection.once('open',()=>{
console.log("Connected to Mongo via Mongoose")
}).on('error',(err)=>{
  console.log("Connection Error: " + err)
})

//Create Schema and Model

var Account = new Schema({
    username: String,
    twitterId: String,
    pints: Array
})

var Pint = new Schema({
  title: String,
  image: String,
  likedBy: Array,
  comments: Array
})

var Account = mongoose.model('pinterest', Account)

//Export
module.exports = {
  Account: Account,
  Pint: Pint
}
