var b = ['ab', 'ac', 'bc'];
var a = [];

b.forEach(function(val) {
  if (a[val] === undefined) {
    a[val] = 0;
  }
  a[val]++;
});

console.log(a);
