var fs = require('fs');
var rl = require('readline');

var partOne = function() {
  var stream = fs.createReadStream('day_19.txt');
  var rl_stream = rl.createInterface({input: stream});

  var translater = {};
  var combinations = {};
  var molecule;
  rl_stream.on('line', function(line) {
    if (line.length === 0) return;
    if (line.search(/=>/) != -1) {
      key_value = line.split(' => ');
      if (translater[key_value[0]] === undefined) {
        translater[key_value[0]] = [];
      }
      translater[key_value[0]].push(key_value[1]);
    } else {
      molecule = line;
    }

  });
  rl_stream.on('close', function() {
    var can_be_translated = Object.keys(translater);
    can_be_translated.forEach(function(element) {
      var parts = molecule.split(element);
      var length = parts.length;
      if (length != 1) {
        parts.forEach(function(part, idx) {
          translater[element].forEach(function(replacement) {
            var first_part = parts.slice(0, idx).join(element) + replacement;
            var last_part = parts.slice(idx, length).join(element);
            var combo = first_part + last_part;
            console.log('----------------');
            console.log(element + idx);
            console.log(first_part);
            console.log('---');
            console.log(last_part);
            combinations[combo] = true;
          });
        });
      }
    });
    console.log(Object.keys(combinations).length);
  });
};

partOne();
