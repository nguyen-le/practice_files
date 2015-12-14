var fs = require('fs');
var partOne = function() {
  fs.readFile('day_1.txt', 'utf8', function (err, data) {
    if (err) throw err;
    var length = data.length;
    var sum = 0;
    for (var i = 0; i < length; i++) {
      var letter = data.charAt(i);
      if (letter === '(') {
        sum++;
      } else if (letter === ')') {
        sum--;
      }
    }
    console.log(sum);
  });
};
var partTwo = function() {
  fs.readFile('day_1.txt', 'utf8', function (err, data) {
    if (err) throw err;
    var length = data.length;
    var sum = 0;
    for (var i = 0; i < length; i++) {
      var letter = data.charAt(i);
      if (letter === '(') {
        sum++;
      } else if (letter === ')') {
        sum--;
      }
      if (sum < 0) {
        break;
      }
    }
    console.log(i + 1);
  });
};
partTwo();
