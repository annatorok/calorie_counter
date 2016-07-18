var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
// app.use(express.static('../../../week-08/day-4/todo_api'));

app.listen(3000);
