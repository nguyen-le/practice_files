console.log('w7d1');
function HelloFromReact() {
  React.render(
    React.createElement('div', {id: 'original-hello'}, 'Hello from React!'),
    document.getElementById('my-component')
  );
}
// for reference, not used
function AlterHelloFromReact() {
  React.render(
    React.createElement('div', {className: 'altered'}, 'Altered Hello from React!'),
    document.getElementById('my-component')
  );
}
//
function RenderButton(counter) {
  React.render(
    React.createElement(counter, {}, ''),
    document.getElementById('my-button')
  );
}

var ClickCounter = React.createClass({
  getInitialState: function() {
    return {count: 0};
  },
  click: function(event) {
    event.preventDefault();
    this.setState({count: this.state.count + 1});
  },
  render: function() {
    return React.createElement(
      'div',
      {},
      React.createElement(
        'button',
        {onClick: this.click},
        'Click!'
      ),
      React.createElement(
        'span',
        {},
        this.state.count
      )
    );
  }
});
var ClickCounterJSX = React.createClass({
  getInitialState: function() {
    return {count: 0};
  },
  click: function(event) {
    event.preventDefault();
    this.setState({count: this.state.count + 1});
  },
  render: function() {
    return (
      <div>
        <button onClick={this.click}>Click me!!</button>
        <span>{this.state.count}</span>
      </div>
    );
  }
});

HelloFromReact();
// what i think happens here is that RenderButton is called which calls render()
// on the first argument which is a React Element of ClickCounter. ClickCounter
// calls its render() function which returns a React Element button with 'Click!'
RenderButton(ClickCounter);
RenderButton(ClickCounterJSX);
