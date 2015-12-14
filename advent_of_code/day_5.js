var fs = require('fs');
var rl = require('readline');

Array.prototype.includes = function(search) {
  var found = false;
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === search) {
      found = true;
      break;
    }
  }
  return found;
};
var hasBadLetter = function(str) {
  bad_strings = ['ab', 'cd', 'pq', 'xy'];
  return bad_strings.includes(str);
};
var partOne = function() {
  var file_stream = fs.createReadStream('day_5.txt');
  var readable_stream = rl.createInterface({input: file_stream});
  var vowels = ['a','e','i','o','u'];
  var nice_words = 0;

  readable_stream.on('line', function(line) {
    var doubles = false;
    var vowel_count = 0;
    var naughty = false;

    line = line.trim();

    if (vowels.includes(line[0])) {
      vowel_count++;
    }

    for (var i = 0, l = line.length; i < l - 1; i++) {
      letter_pair = line.slice(i, i + 2);
      if (hasBadLetter(letter_pair)) {
        naughty = true;
        break;
      }
      if (vowels.includes(letter_pair[1])) {
        vowel_count++;
      }
      if (letter_pair[0] === letter_pair[1]) {
        doubles = true;
      }
    }
    if (!naughty && doubles && vowel_count >= 3) {
      nice_words++;
    }
  });
  readable_stream.on('close', function() {
    console.log('Nice words: ' + nice_words);
  });
};

var partTwo = function() {
  var file_stream = fs.createReadStream('day_5.txt');
  var readable_stream = rl.createInterface({input: file_stream});

  var nice_words = 0;

  readable_stream.on('line', function(line) {
    // good words have repeating pair of letters
    // has a 1-x-1 letter combination
    var previous_letter,
        letters,
        letter_pairs = {},
        letter_repeat = false,
        pair_repeat = false;

    line = line.trim();
    for (var i = 0, l = line.length; i < l - 1; i++) {
      letters = line.slice(i, i + 2);
      if (previous_letter === letters[1]) {
        letter_repeat = true;
      }

      if (letter_pairs[letters] === undefined) {
        letter_pairs[letters] = 0;
      }
      if (!((previous_letter === letters[0]) &&
         (letters[0] === letters[1]))) {
        letter_pairs[letters] += 1;
      }

      previous_letter = letters[0];
    }

    for (var prop in letter_pairs) {
      if (letter_pairs[prop] > 1) {
        pair_repeat = true;
        break;
      }
    }

    if (letter_repeat && pair_repeat) {
      nice_words++;
    }
  });
  readable_stream.on('close', function() {
    console.log('Nice words: ' + nice_words);
  });
};
var partTwoRegex = function() {
  var stream = fs.createReadStream('day_5.txt');
  var rl_stream = rl.createInterface({input: stream});
  var nice_words = 0;
  rl_stream.on('line', function(line) {
    line = line.trim();
    pair_match = line.match(/(..).*\1/);
    letter_skip_match = line.match(/(.).\1/);
    if (pair_match !== null && letter_skip_match !== null) {
      nice_words++;
    }
  });
  rl_stream.on('close', function() {
    console.log(nice_words);
  });
};
partTwoRegex();
// 57 is wrong
