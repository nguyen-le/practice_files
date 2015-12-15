/* jshint esnext: true */
const fs = require('fs');
const rl = require('readline');

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

    gates[gate] = signal;
    return;


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

  // a: x AND y
  // a: x OR y
  // a: x LSHIFT 2
  // a: x RSHIFT 2
  // a: NOT x
  // a: 123
  var findValue = function(gate) {
    console.log();
    console.log('find_value start');
    var running_total;
    var gate_value = gates[gate];
    console.log('gate: ' + gate + '; ' + 'value: ' + gates[gate]);
    console.log(gate);
    if (!isNaN(gate)) {
      running_total = parseInt(gate);
      return running_total;
    } else if (gate_value.toString().search(/[a-z]/i) == -1) {
      console.log('found a number');
      console.log(gate_value);
      running_total = parseInt(gate_value);
    } else {
      var logical_flow = gate_value.split(' ');
      if (logical_flow.length === 1) {
        console.log('variable gate');
        running_total = findValue(logical_flow[0]);
      } else if (logical_flow.length === 2) {
        // NOT
        console.log(not);
        var independent_gate = logical_flow[1];
        running_total = findValue(independent_gate) ^ 65535;
      } else if (logical_flow.length === 3) {
        // AND, OR, LSHIFT, RSHIFT
        console.log('length 3');
        var independent_gate_1 = logical_flow[0];
        var independent_gate_2 = logical_flow[2];
        switch (logical_flow[1]) {
          case and:
            console.log(and);
            console.log(independent_gate_1);
            console.log(independent_gate_2);
            running_total = findValue(independent_gate_1) & findValue(independent_gate_2);
            break;
          case or:
            console.log(or);
            running_total = findValue(independent_gate_1) | findValue(independent_gate_2);
            break;
          case lshift:
            console.log(lshift);
            running_total = findValue(independent_gate_1) << independent_gate_2;
            if (running_total > 65535) {
              running_total = parseInt(running_total.toString(2).slice(-16), 2);
            }
            break;
          case rshift:
            console.log(rshift);
            running_total = findValue(independent_gate_1) >> independent_gate_2;
            if (running_total < 0) {
              running_total = 0;
            }
            break;
        }
      }
    }
    gates[gate] = running_total;
    return running_total;
  };

  rl_stream.on('close', function() {
    //console.log(gates.a);
    //console.log(gates.lx);
    //console.log(gates.lw);
    //console.log(gates.lc);
    //console.log(gates.lv);
    //console.log(gates.lu);
    //console.log(gates.lr);
    //console.log(gates.lt);
    //console.log(gates.ls);
    //console.log(gates.lf);
    //console.log(gates.ld);
    //console.log(gates.le);
    //console.log(gates.lq);
    var original_gates = Object.assign({}, gates);
    //console.log(findValue('a'));
    var a_vale = findValue('a');
    Object.assign(gates, original_gates);
    gates.b = a_vale;
    console.log('a value: ' + findValue('a'));
    //var gatess = {};
    //keys = Object.keys(gates),
    //len = keys.length;
    //keys.sort();
    //for (var i = 0; i < len; i++) {
      //gatess[keys[i]] = gates[keys[i]];
    //}
    //console.log(gatess);
    //console.log(gates);
  });
};
partOne();
