var fs = require('fs');
var rl = require('readline');

var ingredientGenerator = function* () {
  for (var i = 0; i < 101; i++) {
    for (var j = 0; j < 101 - i; j++) {
      for (var k = 0; k < 101 - i - j; k++) {
        var l = 100 - i - j - k;
        yield [i, j, k, l];
      }
    }
  }
}

var partOne = function() {
  var stream = fs.createReadStream('day_15.txt');
  var rl_stream = rl.createInterface({input: stream});
  var ingredients = {};

  rl_stream.on('line', function(line) {
    var ingredient = line.split(':')[0];
    ingredients[ingredient] = {};
    var numbers = line.match(/(-)?\d+/g);
    ingredients[ingredient]['capacity'] = parseInt(numbers[0]);
    ingredients[ingredient]['durability'] = parseInt(numbers[1]);
    ingredients[ingredient]['flavor'] = parseInt(numbers[2]);
    ingredients[ingredient]['texture'] = parseInt(numbers[3]);
    ingredients[ingredient]['calories'] = parseInt(numbers[4]);
  });

  rl_stream.on('close', function() {
    var categories = ['capacity', 'durability', 'flavor', 'texture'];
    var total_points = 0;
    var best_ratio;
    var ratio;
    var it = ingredientGenerator();

    var points;
    var a, b, c, d;
    while (true) {
      ratio = it.next().value;
      if (ratio === undefined) {
        break;
      }
      a = ratio[0];
      b = ratio[1];
      c = ratio[2];
      d = ratio[3];
      points = 1;
      var calories = ingredients.Sugar.calories * a + 
        ingredients.Sprinkles.calories * b +
        ingredients.Candy.calories * c +
        ingredients.Chocolate.calories * d;
      if (calories !== 500) {
        continue;
      }
      categories.forEach(function(category) {
        var total = ingredients.Sugar[category] * a + 
          ingredients.Sprinkles[category] * b +
          ingredients.Candy[category] * c +
          ingredients.Chocolate[category] * d;
        if (total < 0) {
          total = 0;
        }
        points *= total;
      })
      if (points > total_points) {
        total_points = points;
        best_ratio = ratio;
      }
    }
    console.log(total_points);
    console.log(best_ratio);
  });
}
partOne();
