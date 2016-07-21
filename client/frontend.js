'use strict';

addButton.addEventListener('click', addMeal);

mealsContainer.addEventListener('click', function (event) {
  var answer = confirm("Are you sure you want to delete this meal?");
  if (answer === true) {
    if (event.target.classList.value === 'delete') {
      deleteMeal(event, event.target.parentNode.id)
      return true;
    }
  } else {
    return false;
  }
})

filterButton.addEventListener('click', function (event) {
  domElements.displayFilteredMeals();
})


function getRequest() {
  readRequest.httpRequest('GET', local, '', function (response) {
    domElements.displayMeals(JSON.parse(response));
  }
);
}

function addMeal() {
  readRequest.httpRequest('POST', local, JSON.stringify({name: nameInputField.value, calories: caloriesInputField.value, date: dateInputField.value}), function (response) {
    domElements.displayOneMeal(JSON.parse(response));
  })
};

function deleteMeal(event, id) {
  readRequest.httpRequest('DELETE', local + id, '', function (response) {
    document.getElementById(id).remove();
    domElements.updateTotal();
  })
}

getRequest();
