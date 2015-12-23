var fs = require('fs');
var rl = require('readline');

var partOne = function() {
  var stream = fs.createReadStream('day_14.txt');
  var rl_stream = rl.createInterface({input: stream});

  var reindeer_speed = {};
  var time = 2503;
  rl_stream.on('line', function(line) {
    var reindeer = line.match(/\w+/);
    var numbers = line.match(/\d+/g);
    flying_pattern = {
      speed: parseInt(numbers[0]),
      fly_time: parseInt(numbers[1]),
      rest_time: parseInt(numbers[2])
    };
    reindeer_speed[reindeer] = flying_pattern;
  });
  rl_stream.on('close', function() {
    var max_dist = 0;
    for (var deer in reindeer_speed) {
      deer = reindeer_speed[deer];
      var rounds = parseInt(time / (deer.fly_time + deer.rest_time));
      var remainder_time = time - rounds * (deer.fly_time + deer.rest_time);
      if (remainder_time >= deer.fly_time) {
        rounds++;
      }
      var dist = rounds * deer.speed * deer.fly_time;
      console.log();
      console.log(rounds);
      console.log(deer.speed);
      console.log(dist);
      if (dist > max_dist) {
        max_dist = dist;
      }
    }
    console.log(max_dist);
  });
};

var partTwo = function() {
  var stream = fs.createReadStream('day_14.txt');
  var rl_stream = rl.createInterface({input: stream});

  var reindeer_info = {};
  var time = 2503;
  rl_stream.on('line', function(line) {
    var reindeer = line.match(/\w+/);
    var numbers = line.match(/\d+/g);
    flying_pattern = {
      speed: parseInt(numbers[0]),
      fly_time: parseInt(numbers[1]),
      rest_time: parseInt(numbers[2]),
      distance: 0,
      points: 0
    };
    reindeer_info[reindeer] = flying_pattern;
  });
  rl_stream.on('close', function() {
    var max_distance = 0;
    var time_passed = 0;
    while (time_passed < time) {
      time_passed++;
      for (var deer in reindeer_info) {
        deer = reindeer_info[deer];
        var interval_time = deer.fly_time + deer.rest_time;
        remainder = time_passed % interval_time;
        if (remainder !== 0 && remainder <= deer.fly_time) {
           deer.distance += deer.speed;
           if (deer.distance > max_distance) {
             max_distance = deer.distance;
           }
        }
      }
      for (deer in reindeer_info) {
        deer = reindeer_info[deer];
        if (deer.distance >= max_distance) {
           deer.points++;
        }
      }
    }
    var max_points = 0;
    var name;
    for (deer in reindeer_info) {
      deern = deer;
      deer = reindeer_info[deer];
      if (deer.points >= max_points) {
        max_points = deer.points;
        var name = deern;
      }
    }
    console.log(name);
    console.log(max_points);
  });
};
partTwo();
