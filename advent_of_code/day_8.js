var fs = require('fs');
var rl = require('readline');

var partOne = function() {
  var stream = fs.createReadStream('day_8.txt');
  var rl_stream = rl.createInterface({input: stream});

  var literal_str_count = 0;
  var actual_str_count = 0;
  rl_stream.on('line', function(line) {
    literal_str_count += line.length;
    var processed_str;
    var actual_length = -2;
    for (var i = 0, l = line.length; i < l; i++) {
      var word = line[i];
      if (word === "\\") {
        i++;
        if (line[i] === 'x') {
          i += 2;
        }
      }
      actual_length++;
    }
    actual_str_count += actual_length;
  });
  rl_stream.on('close', function() {
    console.log(literal_str_count);
    console.log(actual_str_count);
    console.log(literal_str_count - actual_str_count);
  });
};
var partTwo = function() {
  var stream = fs.createReadStream('day_8.txt');
  //stream = fs.createReadStream('lines.txt');
  var rl_stream = rl.createInterface({input: stream});

  var literal_str_count = 0;
  var encoded_str_count = 0;
  rl_stream.on('line', function(line) {
    literal_str_count += line.length;
    var processed_str;
    var encoded_length = 2;
    for (var i = 0, l = line.length; i < l; i++) {
      var word = line[i];
      if (word === "\\" ||
         word === '"') {
        //console.log('escape');
        encoded_length++;
      }
      encoded_length++;
    }
    //console.log(line);
    //console.log(line.length);
    //console.log(encoded_length);
    encoded_str_count += encoded_length;
  });
  rl_stream.on('close', function() {
    console.log(literal_str_count);
    console.log(encoded_str_count);
    console.log(literal_str_count - encoded_str_count);
    console.log(encoded_str_count - literal_str_count);
  });
  // 2685 too high
};
partTwo();
