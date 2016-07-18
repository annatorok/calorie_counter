'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(express.static('client'));

var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'calories'
});

con.connect(function(err){
  if(err){
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

function errorHandling (err) {
  if (err) {
    console.log(err);
    return;
  }
}

app.get('/meals', function(req, res) {
  con.query('SELECT * FROM meal_calories', function (err, result) {
       if (err) {
            console.log(err);
            return;
  }
        res.send(result);
})
});

app.post('/meals', urlencodedParser, function(req, res) {
  con.query("INSERT INTO meal_calories (name, calories, date) VALUES ('" + req.body.text + '' + '' + "')", function (err, result) {
    if (err) {
            console.log(err);
      return;
    }
    res.send({ id: result.insertId, text: req.body.text });
  });
});




app.listen(3000);
