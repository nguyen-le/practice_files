// x: 0 - 999
// y: 0 - 999
// follow the instructions turning on/off lights, how many are lit?
var fs = require('fs');
var rl = require('readline');
var toggle = 'toggle',
    turnOn = 'turn on',
    turnOff = 'turn off';
var partOne = function() {
  var stream = fs.createReadStream('day_6.txt');
  //var stream = fs.createReadStream('lines.txt');
  var rl_stream = rl.createInterface({input: stream});

  var grid = [];
  var i = 0;
  while (i < 1000) {
    var row = [];
    var j = 0;
    while (j < 1000) {
      row.push(0);
      j++;
    }
    grid.push(row);
    i++;
  }
  var lights = 0;
  rl_stream.on('line', function(line) {
    var coords = line.match(/(\d+)/g);
    var x1 = parseInt(coords[0]);
    var y1 = parseInt(coords[1]);
    var x2 = parseInt(coords[2]);
    var y2 = parseInt(coords[3]);
    var method;
    if (line.search(toggle) != -1) {
      method = toggle;
    } else if (line.search(turnOn) != -1) {
      method = turnOn;
    } else if (line.search(turnOff) != -1) {
      method = turnOff;
    }
    grid.slice(y1, y2 + 1).forEach(function(row) {
      var idx = x1;
      while (idx < x2 + 1) {
        switch (method) {
          case toggle:
            row[idx] = (row[idx] ? 0 : 1);
            break;
          case turnOn:
            row[idx] = 1;
            break;
          case turnOff:
            row[idx] = 0;
            break;
        }
        idx++;
      }
    });
  });
  rl_stream.on('close', function() {
    grid.forEach(function(row) {
      row.forEach(function(el) {
        if (el === 1) {
          lights++;
        }
      });
    });
    console.log(lights);
  });
};
// partOne();
// 11754577 too high
// 77594 too low
var partTwo = function() {
  var stream = fs.createReadStream('day_6.txt');
  //var stream = fs.createReadStream('lines.txt');
  var rl_stream = rl.createInterface({input: stream});

  var grid = [];
  var i = 0;
  while (i < 1000) {
    var row = [];
    var j = 0;
    while (j < 1000) {
      row.push(0);
      j++;
    }
    grid.push(row);
    i++;
  }
  var lights = 0;
  rl_stream.on('line', function(line) {
    var coords = line.match(/(\d+)/g);
    var x1 = parseInt(coords[0]);
    var y1 = parseInt(coords[1]);
    var x2 = parseInt(coords[2]);
    var y2 = parseInt(coords[3]);
    var method;
    if (line.search(toggle) != -1) {
      method = toggle;
    } else if (line.search(turnOn) != -1) {
      method = turnOn;
    } else if (line.search(turnOff) != -1) {
      method = turnOff;
    }
    grid.slice(y1, y2 + 1).forEach(function(row) {
      var idx = x1;
      while (idx < x2 + 1) {
        switch (method) {
          case toggle:
            //row[idx] += (row[idx] ? 0 : 1);
            row[idx] += 2;
            break;
          case turnOn:
            row[idx] += 1;
            break;
          case turnOff:
            row[idx] += (row[idx] > 0 ? -1: 0);
            break;
        }
        idx++;
      }
    });
  });
  rl_stream.on('close', function() {
    grid.forEach(function(row) {
      row.forEach(function(el) {
            lights += el;
      });
    });
    console.log(lights);
  });
};
partTwo();
