'use strict';

var tape = require('tape');
var meal = require('./db_queries');

var sinon = require('sinon');

tape('true', function(t) {
  t.equal(true, true);
  t.end();
});

tape('proba have been called', function(t) {
  var callback = sinon.spy();
  callback();
  t.ok(callback.called);
  t.end();
});

tape('proba have been called with 3', function(t) {
  var callback = sinon.spy();
  callback(3);
  t.ok(callback.calledWith(3));
  t.end();
});

tape('addmeal calls query', function (t) {
  var mockConnection = {
    query: sinon.spy(),
    connect: function() {}
  };
  var testMealModule = meal(mockConnection);
  testMealModule.addOneMeal({name: "alma"});
  t.ok(mockConnection.query.called);
  t.end();
});

tape('addmeal calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy(),
    connect: function() {}
  };
  var testMealModule = meal(mockConnection);

  var testMeal = {
    name: "alma",
    calories: 2,
    date: "ma"
  };

  var expectedSQL = 'INSERT INTO meal_calories ' +
    '(name, calories, date)' +
    ' VALUES (\'alma\', \'2\', \'ma\');';

  testMealModule.addOneMeal(testMeal);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL));
  t.end();
});
