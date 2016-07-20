'use strict';

addButton.addEventListener('click', addMeal);


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

function deleteMeal() {
  readRequest.httpRequest('DELETE', local, {id: id}), function (response) {
    document.getElementById(id).remove();
  }
}

// function filterMeals() {
//  readRequest.httpRequest('GET', local, {date: req.body.date}, function (response) {
//   domElements.filerMeal(JSON.parse(response))''
// })
// }


getRequest();
