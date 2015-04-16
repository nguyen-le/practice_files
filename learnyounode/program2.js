var args = process.argv.slice(2);
var total = 0;
args.forEach(function(n) {
    total += Number(n);
});
console.log(total);
