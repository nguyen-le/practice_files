// count the numbers and add them up
var fs = require('fs');
var partOne = function() {
  fs.readFile('day_12.txt', 'utf8', function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    console.log(getSum(data));
  });
};

var getSum = function getSum(obj) {
  var sum = 0;
  if (Array.isArray(obj)) {
    sum = parseArr(obj);
  } else if (typeof obj === 'number') {
    sum = obj;
  } else if (typeof obj === 'object') {
    sum = parseObj(obj);
  } else if (obj === 'red') {
    throw new Error('red');
  }
  return sum;
};

var parseArr = function parseArr(arr) {
  var sum = 0;
  arr.forEach(function(el) {
    try {
      sum += getSum(el);
    } catch (e) {
      return;
    }
  });
  return sum;
};

var parseObj = function parseObj(obj) {
  var sum = 0;
  for (var key in obj) {
    try {
      sum += getSum(obj[key]);
    } catch (e) {
      sum = 0;
      break;
    }
  }
  return sum;
}
partOne();

