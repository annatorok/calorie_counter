'use strict';

var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'calories',
  timezone: 'utc'
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(express.static('client'));

var db = require('./db_queries');
var dbQueries = db(con);

app.get('/meals', function(req, res) {
  dbQueries.listMeals(req, function (result) {
    res.send(result);
  });
});

app.post('/meals', urlencodedParser, function(req, res) {
  dbQueries.addOneMeal(req.body, function (result) {
    res.send(result);
  });
});

app.delete('/meals/:id', urlencodedParser, function(req, res) {
  dbQueries.deleteOneMeal(req.params.id, function (result) {
    if (result.affectedRows === 1) {
      res.send({status: 'ok', id: req.params.id})
    } else {
      res.send({status: 'not exists'});
    }
  });
});

app.listen(3000);
