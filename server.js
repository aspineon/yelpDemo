var express = require("express");
var bodyParser = require("body-parser");
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var app = express();
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  // yay!
});
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public", {
  index: "angular.html"
}));
var personSchema = mongoose.Schema({
  name: String,
  age: String
});
var Person = mongoose.model('Person', personSchema);
app.get('/', function(req, resp) {
  console.log('Get Request');
  //var personSchema = mongoose.Schema({
  //  name: String,
  //  age: String
  //});
  //var Person = mongoose.model('Person', personSchema);
  var persons = [];
  Person.find(function(err, persons) {
    if (err) return console.error(err);
    console.log(persons);
  })
  resp.json(persons);
  //resp.sendFile(__dirname + '/public/angular.html'); // load the single view file (angular will handle the page changes on the front-end)
});
//app.get("/", function(req, resp) {
//  console.log('Get Request');
//  var personSchema = mongoose.Schema({
//    name: String,
//    age: String
//  });
//  var Person = mongoose.model('Person', personSchema);
//  Person.find(function(err, persons) {
//    if (err) return console.error(err);
//    console.log(persons);
//  })
//  resp.json(persons);
//});

app.post("/person", function(req, resp) {
  var body = req.body;
  var paramName = body.name;
  var paramAge = body.age;
  console.log('Person name:' + paramName);
  console.log('Person age:' + paramAge);
  var newPerson = new Person({
    name: paramName,
    age: paramAge
  });
  console.log('New Person name:' + newPerson.name);
  console.log('New Person age:' + newPerson.age);
  newPerson.save(function(err, newPerson) {
    if (err) return console.error(err);
    console.log('success');
  });

  var persons = "";
  Person.find(function(err, persons) {
    if (err) return console.error(err);
    console.log(persons);
  })
  resp.json(persons);
});

app.listen(8080);
