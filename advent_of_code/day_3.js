var fs = require('fs');

var partOne = function() {
  fs.readFile('day_3.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var x = 0,
        y = 0,
        duplicates = 0,
        presents = 1,
        houses = {0: {0: 1}},
        length = data.length;
    for (var i = 0; i < length; i++) {
      switch (data[i]) {
        case '<':
          x--;
          break;
        case '>':
          x++;
          break;
        case '^':
          y++;
          break;
        case 'v':
          y--;
          break;
      }
      x_str = x.toString();
      y_str = y.toString();
      if (houses[x_str] === undefined) {
        houses[x_str] = {};
      }
      if (houses[x_str][y_str] === undefined) {
        houses[x_str][y_str] = 0;
      } else if (houses[x_str][y_str] === 1) {
        duplicates += 1;
      }
      houses[x_str][y_str] += 1;
      if (houses[x_str][y_str] === 1) {
        presents++;
      }
    }
    console.log('duplicates: ' + duplicates);
    console.log('presents: ' + presents);
  });
};
var partTwo = function() {
  fs.readFile('day_3.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var x,
        y,
        x_santa = 0,
        y_santa = 0,
        x_robo = 0,
        y_robo = 0,
        duplicates = 0,
        presents = 1,
        houses = {0: {0: 2}},
        length = data.length,
        modifier = -1;
    for (var i = 0; i < length; i++) {
      modifier *= -1;
      if (modifier === 1) {
        switch (data[i]) {
          case '<':
            x_santa--;
            break;
          case '>':
            x_santa++;
            break;
          case '^':
            y_santa++;
            break;
          case 'v':
            y_santa--;
            break;
        }
        x = x_santa;
        y = y_santa;
      } else {
        switch (data[i]) {
          case '<':
            x_robo--;
            break;
          case '>':
            x_robo++;
            break;
          case '^':
            y_robo++;
            break;
          case 'v':
            y_robo--;
            break;
        }
        x = x_robo;
        y = y_robo;
      }
      x_str = x.toString();
      y_str = y.toString();
      if (houses[x_str] === undefined) {
        houses[x_str] = {};
      }
      if (houses[x_str][y_str] === undefined) {
        houses[x_str][y_str] = 0;
      } else if (houses[x_str][y_str] === 1) {
        duplicates += 1;
      }
      houses[x_str][y_str] += 1;
      if (houses[x_str][y_str] === 1) {
        presents++;
      }
    }
    console.log('duplicates: ' + duplicates);
    console.log('presents: ' + presents);
  });
};

partTwo();
