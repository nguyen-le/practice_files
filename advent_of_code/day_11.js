// increment last letter until z then rollover
// look for: 3 letter straights, 2 pairs, and no i,o,l
var input = 'vzbxkghb';

var alphabet_str = 'abcdefghijklmnopqrstuvwxyz';
var alphabet = {};
for (var i = 0, l = alphabet_str.length; i < l; i++) {
  alphabet[alphabet_str[i]] = i + 1;
}
var incrementPw = function(input) {

  input.slice(-1)
};

var partOne = function(input) {
  var valid_pw = false;
  while (!valid_pw) {
    input = incrementPw(input);
  }
  console.log(input);
};
partOne(input);
