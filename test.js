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
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);
  testMealModule.addOneMeal({name: "alma"});
  t.ok(mockConnection.query.called);
  t.end();
});
