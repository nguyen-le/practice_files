var fs = require('fs');
var arg = process.argv.slice(2)[0];
var readFileCallback = function(err, data) {
    if (err) throw err;
    var lines = data.split('\n');
    console.log(lines.length - 1);
};
fs.readFile(arg, 'utf8', readFileCallback);
