var fs = require('fs'),
    crypto = require('crypto');
var getMd5 = function(key) {
  hash = crypto.createHash('md5');
  hash.update(key, 'utf8');
  return hash.digest('hex');
};
var partOne = function() {
  fs.readFile('day_4.txt', 'utf8', function(err, data) {
    if (err) throw err;
    i = 1;
    while (true) {
      key = data.trim() + i.toString();
      hashed_val = getMd5(key);
      if (hashed_val.slice(0, 6) === '000000') {
        break;
      }
      i++;
    }
    console.log(i);
    console.log(key);
    console.log(hashed_val);
  });
};
partOne();
