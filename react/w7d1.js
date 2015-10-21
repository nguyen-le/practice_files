console.log('w7d1');
function HelloFromReact() {
	React.render(
		React.createElement('div', {}, 'Hello from React!'),
		document.getElementById('my-component')
	);
}
function AlterHelloFromReact() {
	React.render(
		React.createElement('div', {className: 'altered'}, 'Altered Hello from React!'),
		document.getElementById('my-component')
	);
}
function CreateButton(obj) {
	return React.createElement(
		'div', 
		{}, 
		React.createElement(
			'button', 
			{onClick: obj.click}, 
			'Click!'
		),
		React.createElement('span', {}, obj.state.count)
	);
}
function RenderButton() {
	React.render(
		React.createElement(ClickCounter, {}, ''),
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
		// return CreateButton(this);
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

HelloFromReact();
// what i think happens here is that RenderButton is called which calls render()
// on the first argument which is a React Element of ClickCounter. ClickCounter
// calls its render() function which returns a React Element button with 'Click!'
RenderButton(); 
