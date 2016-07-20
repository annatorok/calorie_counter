'use strict';
var local = 'http://localhost:3000/meals/';

var readRequest = (function () {
function httpRequest(method, url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
  if (xhr.readyState === xhr.DONE) {
    callback(xhr.response);
    }
  }
  xhr.send(data);
};
  return {
    httpRequest: httpRequest
  }
})();
