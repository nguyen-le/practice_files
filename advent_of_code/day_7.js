var fs = require('fs');
var rl = require('readline');

var lshift = 'LSHIFT',
    rshift = 'RSHIFT',
    not = 'NOT',
    and = 'AND',
    or = 'OR',
    assign = 'assign';

var search = function(str, word) {
  if (str.search(word) !== -1) {
    return true;
  }
};
var partOne = function() {
  var stream = fs.createReadStream('day_7.txt');
  // stream = fs.createReadStream('lines.txt');
  var rl_stream = rl.createInterface({input: stream});

  var gates = {};
  rl_stream.on('line', function(line) {
    var eq_sides = line.split('->');
    var signal = eq_sides[0].trim();
    var gate = eq_sides[1].trim();

    var method = assign;
    if (search(signal, lshift)) {
      method = lshift;
    } else if (search(signal, rshift)) {
      method = rshift;
    } else if (search(signal, and)) {
      method = and;
    } else if (search(signal, or)) {
      method = or;
    } else if (search(signal, not)) {
      method = not;
    }

    var signal_flow, input_value_1, input_value_2;
    switch (method) {
      case lshift:
        signal_flow = signal.split(lshift);
        input_value_1 = signal_flow[0].trim();
        input_value_2 = parseInt(signal_flow[1].trim());
        value = (parseInt(gates[input_value_1]) << parseInt(input_value_2));
        if (value > 65535) {
          value = parseInt(value.toString(2).slice(-16), 2);
        }
        gates[gate] = value;
        break;
      case rshift:
        signal_flow = signal.split(rshift);
        input_value_1 = signal_flow[0].trim();
        input_value_2 = parseInt(signal_flow[1].trim());
        value = (parseInt(gates[input_value_1]) >> parseInt(input_value_2));
        if (value < 0) {
          value = 0;
        }
        gates[gate] = value;
        break;
      case and:
        signal_flow = signal.split(and);
        input_value_1 = signal_flow[0].trim();
        input_value_2 = signal_flow[1].trim();
        gates[gate] = (parseInt(gates[input_value_1]) & parseInt(gates[input_value_2]));
        break;
      case or:
        signal_flow = signal.split(or);
        input_value_1 = signal_flow[0].trim();
        input_value_2 = signal_flow[1].trim();
        gates[gate] = (parseInt(gates[input_value_1]) | parseInt(gates[input_value_2]));
        break;
      case not:
        signal_flow = signal.split(' ')[1].trim();
        gates[gate] = parseInt(gates[signal_flow]) ^ 65535;
        break;
      case assign:
        gates[gate] = parseInt(signal);
        break;
    }
  });
  rl_stream.on('close', function() {
    console.log(gates);
    console.log(gates.lx);
    console.log(gates.a);
  });
};
partOne();
