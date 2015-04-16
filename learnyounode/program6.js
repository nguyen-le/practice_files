var fs = require('fs');
var arg = process.argv.slice(2)[0];
var filter = process.argv.slice(2)[1];
function callback(err, list) {
    if (err) throw err;
    list.forEach(function(file) {
        if (file.match("." + filter)) {
            console.log(file);
        }
    });
}

fs.readdir(arg, callback);
