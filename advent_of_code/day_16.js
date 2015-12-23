/* jshint esnext: true */
const fs = require('fs');
const rl = require('readline');
const known_props = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
};

var aunts = {};
var partOne = function() {
  var stream = fs.createReadStream('day_16.txt');
  var rl_stream = rl.createInterface({input: stream});
  rl_stream.on('line', function(line) {
    var num = line.match(/\d+/);
    var props = line.match(/\w+: \d+/g);
    aunts[num] = {};
    props.forEach(function(str) {
      var prop_and_value = str.split(': ');
      aunts[num][prop_and_value[0]] = parseInt(prop_and_value[1]);
    })
  });
  rl_stream.on('close', function() {
    for (var prop in known_props) {
      for (var aunt in aunts) {
        if (aunts[aunt][prop] !== undefined &&
            aunts[aunt][prop] !== known_props[prop]) {
          delete aunts[aunt];
        }
      }
    }
    console.log(aunts);
  });
};
var partTwo = function() {
  var stream = fs.createReadStream('day_16.txt');
  var rl_stream = rl.createInterface({input: stream});
  rl_stream.on('line', function(line) {
    var num = line.match(/\d+/);
    var props = line.match(/\w+: \d+/g);
    aunts[num] = {};
    props.forEach(function(str) {
      var prop_and_value = str.split(': ');
      aunts[num][prop_and_value[0]] = parseInt(prop_and_value[1]);
    })
  });
  rl_stream.on('close', function() {
    var i = 0;
    for (var prop in known_props) {
      for (var aunt in aunts) {
        if (aunts[aunt][prop] === undefined) {
          continue;
        }
        if (prop === 'cats' || prop === 'trees') {
          if (aunts[aunt][prop] <= known_props[prop]) {
            delete aunts[aunt];
          }
        } else if (prop === 'pomeranians' || prop === 'goldfish') {
          if (aunts[aunt][prop] >= known_props[prop]) {
            delete aunts[aunt];
          }
        } else if (aunts[aunt][prop] !== known_props[prop]) {
          delete aunts[aunt];
        }
      }
    }
    console.log(aunts);
  });
};
partTwo();
