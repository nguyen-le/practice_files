var fs = require('fs');
var rl = require('readline');
var readFile = function() {
  var stream,
      rl_stream,
      total = 0,
      total_ribbon = 0;
  stream = fs.createReadStream('day_2.txt');
  rl_stream = rl.createInterface({input: stream});
  rl_stream.on('line', function(line) {
    var dims, area_1, area_2, area_3;
    dims = line.split('x');
    dims = dims.map(function(num_string) {
      return parseInt(num_string);
    });
    dims.sort(function(a, b) {
      return a - b;
    });
    shorter_s = dims[0];
    short_s = dims[1];

    area_1 = dims[0] * dims[1];
    area_2 = dims[0] * dims[2];
    area_3 = dims[1] * dims[2];

    perimeter = 2 * (short_s + shorter_s);
    volume = area_1 * dims[2];

    total += 2 * (area_1 + area_2 + area_3) + (shorter_s * short_s);
    total_ribbon += (perimeter + volume);
  });
  rl_stream.on('close', function() {
    console.log('total wrapping paper: ' + total);
    console.log('total ribbon: ' + total_ribbon);
  });
};
readFile();
