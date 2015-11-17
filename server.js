var express = require("express");
var bodyParser = require("body-parser");
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var app = express();
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public", {index: "angular.html"}));

app.post("/person",function(req,resp){
    var body = req.body;
    resp.json(body);
});

app.listen(8080);
