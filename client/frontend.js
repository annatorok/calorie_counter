'use strict';

var local = 'http://localhost:3000/meals';
var addButton = document.querySelector('.add-meal-button');
var nameInputField = document.querySelector('.name-of-meal-input');
var caloriesInputField = document.querySelector('.calories-input');
var dateInputField = document.querySelector('.date-input');
var mealsContainer = document.querySelector('ul');

function httpRequest(method, url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(data);
  xhr.onload = function () {
  if (xhr.readyState === xhr.DONE) {
    callback(xhr.response);
    }
  }
};

function getRequest() {
  httpRequest('GET', local, '', function (response) {
    displayMeals(JSON.parse(response));
  }
);
}

function displayMeals(response) {
  response.forEach(function (e) {
    displayOneMeal(e);
  })
}

function displayOneMeal(e) {
  var newLi = document.createElement('li');
  newLi.textContent = 'Meal: ' + e.name + ', Calories: ' + e.calories + ' kcal' +  ', Date: ' + e.date;
  mealsContainer.appendChild(newLi);
  nameInputField.value = '';
  caloriesInputField.value = '';
  mealsContainer.value = '';
  }

function addMeal() {
  httpRequest('POST', local, JSON.stringify({name: nameInputField.value, calories: caloriesInputField.value, date: dateInputField.value}), function (response) {
    displayOneMeal(JSON.parse(response));
  })
};

getRequest();

addButton.addEventListener('click', addMeal);
