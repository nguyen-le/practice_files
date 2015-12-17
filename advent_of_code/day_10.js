// Task: read the input and count the occurrences to build new string
var input = 1113122113;

var transformStr = function(str) {
  var letter_count = {};
  var result = '';
  var previous_letter;
  for (var i = 0, l = str.length; i < l + 1; i++) {
    if ((previous_letter && str[i] !== previous_letter) ||
       i == l + 1) {
      result += letter_count[previous_letter].toString() + previous_letter.toString()
      letter_count[previous_letter] = 0;
      letter_count[str[i]] = 0;
    }
    if (letter_count[str[i]] === undefined) {
      letter_count[str[i]] = 0;
    }
    previous_letter = str[i];
    letter_count[str[i]] += 1;
  }

  return result;
};
var partOne = function() {
  var str_input = input.toString();
  var i = 0;
  while (i < 40) {
    str_input = transformStr(str_input);
    i++;
  }
  console.log(str_input);
  console.log(str_input.length);
};
var partTwo = function() {
  var str_input = input.toString();
  var i = 0;
  while (i < 50) {
    str_input = transformStr(str_input);
    i++;
  }
  console.log(str_input.length);
};

partTwo();
