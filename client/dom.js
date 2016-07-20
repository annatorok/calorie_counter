'use strict';

var addButton = document.querySelector('.add-meal-button');
var nameInputField = document.querySelector('.name-of-meal-input');
var caloriesInputField = document.querySelector('.calories-input');
var dateInputField = document.querySelector('.date-input');
var mealsContainer = document.querySelector('ul');

var domElements = (function () {
  function displayMeals(response) {
    response.forEach(function (e) {
      displayOneMeal(e);
    })
  }

  function displayOneMeal(e) {
    var newLi = document.createElement('li');
    newLi.setAttribute('id', e.id);
    newLi.setAttribute('name', e.name);
    newLi.setAttribute('calories', e.calories);
    var date = e.date.toString().slice(0, 10) + ' ' + e.date.toString().slice(11, 16);
    var mealContext = `
    <div id="${e.id}"class='meal-items'>
      <div class='meal-name'>${e.name}</div>
      <div class='meal-calories'>${e.calories} kCal</div>
      <div class='meal-date'>${date}</div>
    </div>`;
    newLi.innerHTML = mealContext;
    mealsContainer.appendChild(newLi);
    nameInputField.value = '';
    caloriesInputField.value = '';
    mealsContainer.value = '';
    }

    return {
      displayMeals: displayMeals,
      displayOneMeal: displayOneMeal,
      addButton: addButton
    }
})();
