console.log("enter in project");
var express = require('express');
var path = require("path");
//var path = __dirname + '/views/';
var app = express();
var Controller = require('./controller/controller');

app.set('view engine','ejs');
app.use(express.static('./public'));
Controller(app);
app.listen(3000);
console.log("app listen 3000!");