var fs = require('fs');
var rl = require('readline');

var partOne = function() {
  var stream = fs.createReadStream('day_18.txt');
  var rl_stream = rl.createInterface({input: stream});
  var grid = [];

  rl_stream.on('line', function(line) {
    var row = [];

    var row_num = 0;
    for (var i = 0, l = line.length; i < l; i++) {
      var light = {status: false, next: false};
      //if ((row_num == 0 || row_num = 99) && (i == 0 || i == line.length - 1))
      var c = line.charAt(i);
      light.status = (c === '#' ? true : false);
      row.push(light);
    }
    grid.push(row);
  });
  rl_stream.on('close', function() {
    var steps = 100;
    for (var i = 0; i < steps; i++) {
      grid.forEach(function(row, idx_row) {
      // check current sides
      // check next row
      var previous_row = grid[idx_row - 1];
      var next_row = grid[idx_row + 1];
        row.forEach(function(light, idx_light) {
          if ((idx_row === 0 || idx_row === grid.length - 1) &&
              (idx_light === 0 || idx_light === row.length - 1)) {
            light.status = true;
            light.next = true;
            return;
          }
          var adjacent_lights_on = 0;
          var left_side = idx_light - 1;
          var right_side = idx_light + 1;

          if (previous_row) {
            if (left_side >= 0 && previous_row[idx_light - 1].status) {
              adjacent_lights_on++;
            }
            if (previous_row[idx_light].status) {
              adjacent_lights_on++;
            }
            if (right_side < row.length && previous_row[idx_light + 1].status) {
              adjacent_lights_on++;
            }
          }
          if (next_row) {
            if (left_side >= 0 && next_row[idx_light - 1].status) {
              adjacent_lights_on++;
            }
            if (next_row[idx_light].status) {
              adjacent_lights_on++;
            }
            if (right_side < row.length && next_row[idx_light + 1].status) {
              adjacent_lights_on++;
            }
          }
          if (left_side >= 0 && row[idx_light - 1].status) {
            adjacent_lights_on++;
          }
          if (right_side < row.length && row[idx_light + 1].status) {
            adjacent_lights_on++;
          }
          if (light.status) {
            if (adjacent_lights_on === 2 || adjacent_lights_on === 3) {
              light.next = true;
            } else {
              light.next = false;
            }
          } else {
            if (adjacent_lights_on === 3) {
              light.next = true;
            } else {
              light.next = false;
            }
          }
        });
      });
      grid.forEach(function(row) {
        row.forEach(function(light) {
          light.status = light.next;
        });
      });
    }
    var num_on = 0;
    grid.forEach(function(row) {
      row.forEach(function(light) {
        if (light.status) {
          num_on++;
        }
      });
    });
    console.log(num_on);
  });
};
partOne();
