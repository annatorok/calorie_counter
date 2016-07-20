'use strict';

var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'calories',
  timezone: 'utc'
});

function errorHandling (err) {
  if (err) {
    console.log(err);
    return;
  }
}

var CalorieCounter = (function () {

  con.connect(function(err){
    if(err){
      console.log("Error connecting to Db");
      return;
    }
    console.log("Connection established");
  });

  function listMeals(req, callback) {
    con.query('SELECT * FROM meal_calories', function (err, result) {
      errorHandling(err);
      callback(result);
    });
  }

  function addOneMeal(req, callback) {
    con.query("INSERT INTO meal_calories (name, calories, date) VALUES ('" + req.body.name + "','" + req.body.calories + "','" + req.body.date + "')", function (err, result) {
      errorHandling();
      callback({ name: req.body.name, calories: req.body.calories, date: req.body.date });
    });
  }

  function deleteOneMeal(req, callback) {
    con.query("DELETE FROM meal_calories WHERE id = ?", req.params.id, function (err, result) {
      errorHandling();
      callback({ result });
})
}

  // function filterMeal (req, callback) {
  //   con.query("SELECT id, name, calories, date FROM meal_calories WHERE date = ?", date, function (err, result) {
  //     errorHandling();
  //     callback({date: req.body.date});
  //   })
  // }

  return {
    listMeals: listMeals,
    addOneMeal: addOneMeal,
    deleteOneMeal: deleteOneMeal,
    // filterMeal: filterMeal
  };
})();

module.exports = CalorieCounter;
