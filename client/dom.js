'use strict';

var addButton = document.querySelector('.add-meal-button');
var filterButton = document.querySelector('.filter-button');
var nameInputField = document.querySelector('.name-of-meal-input');
var caloriesInputField = document.querySelector('.calories-input');
var dateInputField = document.querySelector('.date-input');
var filterDateInputField = document.querySelector('.filter-date-input')
var mealsContainer = document.querySelector('ul');
var mealsList = document.querySelector('.meals-list')

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
      <button class='delete' id='${e.id}'></button>
    </div>`;
    newLi.innerHTML = mealContext;
    mealsContainer.appendChild(newLi);
    nameInputField.value = '';
    caloriesInputField.value = '';
    mealsContainer.value = '';
    updateTotal();
    }

    function getTotalCalories() {
       var calories = document.querySelectorAll('.meal-calories');
       var total = 0;
       for (var i = 0; i < calories.length; i++) {
         var calorie = parseInt(calories[i].textContent);
         total += calorie;
       }
       return total;
     }

     function updateTotal() {
       var total = document.querySelector('.total');
       total.textContent = 'Sum of calories: ' + getTotalCalories() + ' kcal';
     }
    function displayFilteredMeals() {
      var allMealDates = document.querySelectorAll('.meal-date');
      for (var i = 0; i < allMealDates.length; i++) {
        if (allMealDate[i].textContext !== filterDateInputField.value) {
          allMealDates[i].classList.add('hidden');
        } else {
          allMealDates[i].classList.remove('hidden');
          allMealDates[i].classList.add('filtered');
        }
      }
    }

    return {
      addButton: addButton,
      filterButton: filterButton,
      mealsContainer: mealsContainer,
      displayMeals: displayMeals,
      displayOneMeal: displayOneMeal,
      displayFilteredMeals: displayFilteredMeals,
      updateTotal: updateTotal
    }
})();
