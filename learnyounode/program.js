var mymodule = require('./mymodule.js');
var args = process.argv.slice(2);
function callback(err, list) {
    if (err) throw err;
    list.forEach(function(item) {
        console.log(item);
    });
}

mymodule(args[0], args[1], callback);
