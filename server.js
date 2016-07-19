'use strict';

var databaseQueries = require('./db_queries.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(express.static('client'));


app.get('/meals', function(req, res) {
  databaseQueries.listMeals(req, function (result) {
    res.send(result);
  });
});

app.post('/meals', urlencodedParser, function(req, res) {
  databaseQueries.addOneMeal(req, function (result) {
    res.send(result);
  });
});

app.listen(3000);
