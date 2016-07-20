'use strict';

var CalorieCounter = require('./db_queries.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(express.static('client'));


app.get('/meals', function(req, res) {
  CalorieCounter.listMeals(req, function (result) {
    res.send(result);
  });
});

app.post('/meals', urlencodedParser, function(req, res) {
  CalorieCounter.addOneMeal(req, function (result) {
    res.send(result);
  });
});

app.delete('/meals/:id', urlencodedParser, function(req, res) {
  CalorieCounter.deleteOneMeal(req, function (result) {
    if (result.affectedRows === 1) {
      res.send({status: 'ok'})
    } else {
      res.send({status: 'not exist'});
    }
  })
})

// app.get('/meals/:filter', urlencodedParser, function(req, res) {
//   CalorieCounter.filterMeal(req, function (result) {
//     res.send(result);
//   })
// })

app.listen(3000);
