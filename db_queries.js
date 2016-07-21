'use strict';

var CalorieCounter = (function (con) {

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

  function listMeals(req, callback) {
    con.query('SELECT * FROM meal_calories', function (err, result) {
      errorHandling(err);
      callback(result);
    });
  }

  function addOneMeal(item, callback) {
    con.query("INSERT INTO meal_calories (name, calories, date) VALUES ('" + item.name + "','" + item.calories + "','" + item.date + "')", function (err, result) {
      errorHandling();
      callback({ name: item.name, calories: item.calories, date: item.date });
    });
  }

  function deleteOneMeal(id, callback) {
    con.query("DELETE FROM meal_calories WHERE id = ?", id, function (err, result) {
      errorHandling();
      callback({id: id});
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
});

module.exports = CalorieCounter;
