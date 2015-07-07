var fs = require('fs');

module.exports = function(dir_name, file_ext, callback) {
    fs.readdir(dir_name, function(err, list) {
        if (err) return callback(err);
        arr = [];
        list.forEach(function(name) {
            if (name.match("."+file_ext)) {
                arr.push(name);
            }
        });
        callback(null, arr);
    });
};
