var fs = require('fs');
var rl = require('readline');

var partOne = function() {
  var stream = fs.createReadStream('lines.txt');
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
    ingredients[ingredient]['ratio'] = 50;
  });

  rl_stream.on('close', function() {
    console.log(ingredients);
    for (var ingredient in ingredients) {
      ingredient = ingredients[ingredient];
      console.log(ingredient);
    }

  });
}
partOne();
