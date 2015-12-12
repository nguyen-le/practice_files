// Create a custom component by calling React.createClass.

var TimerExample = React.createClass({
    displayName: 'TimerExample',

    getInitialState: function () {
        // This is called before our render function. The object that is
        // returned is assigned to this.state, so we can use it later.
        return { elapsed: 0 };
    },
    componentDidMount: function () {
        // componentDidMount is called by react when the component
        // has been rendered on the page. We can set the interval here:
        this.timer = setInterval(this.tick, 50);
    },
    componentWillUnmount: function () {
        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:
        clearInterval(this.timer);
    },
    tick: function () {
        // This function is called every 50 ms. It updates the
        // elapsed counter. Calling setState causes the component to be re-rendered
        this.setState({ elapsed: new Date() - this.props.start });
    },
    render: function () {
        var elapsed = Math.round(this.state.elapsed / 100);
        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);
        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.
        return React.createElement(
            'p',
            null,
            'This example was started ',
            React.createElement(
                'b',
                null,
                seconds,
                ' seconds'
            ),
            ' ago.'
        );
    }
});

/*
React.render(
    <TimerExample start={Date.now()} />,
    document.getElementById('practical-1')
);
*/

// Example 2
var MenuExample = React.createClass({
    displayName: 'MenuExample',

    getInitialState: function () {
        return { focused: 0 };
    },
    clicked: function (index) {
        // The click handler will update the state with
        // the index of the focused menu entry
        this.setState({ focused: index });
    },
    render: function () {
        // Here we will read the items property, which was passed
        // as an attribute when the component was created
        var self = this;
        // The map method will loop over the array of menu entries,
        // and will return a new array with <li> elements.
        return React.createElement(
            'div',
            null,
            React.createElement(
                'ul',
                null,
                this.props.items.map(function (m, index) {
                    var style = '';
                    if (self.state.focused == index) {
                        style = 'focused';
                    }
                    // Notice the use of the bind() method. It makes the
                    // index available to the clicked function:
                    return React.createElement(
                        'li',
                        { className: style, onClick: self.clicked.bind(self, index) },
                        m
                    );
                })
            ),
            React.createElement(
                'p',
                null,
                'Selected: ',
                this.props.items[this.state.focused]
            )
        );
    }
});

// Render the menu component on the page, and pass an array with menu options

/*
React.render(
    <MenuExample items={ ['Home', 'Services', 'About', 'Contact us'] } />,
    document.body
);
*/
// Let's create a "real-time search" component

var SearchExample = React.createClass({
    displayName: 'SearchExample',

    getInitialState: function () {
        return { searchString: '' };
    },
    handleChange: function (e) {
        // If you comment out this line, the text box will not change its value.
        // This is because in React, an input cannot change independently of the value
        // that was assigned to it. In our case this is this.state.searchString.
        this.setState({ searchString: e.target.value });
    },
    render: function () {
        var libraries = this.props.items;
        searchString = this.state.searchString.trim().toLowerCase();
        if (searchString.length > 0) {
            libraries = libraries.filter(function (l) {
                return l.name.toLowerCase().match(searchString);
            });
        }
        return React.createElement(
            'div',
            null,
            React.createElement('input', { type: 'text', value: this.state.searchString, onChange: this.handleChange, placeholder: 'Type Here' }),
            React.createElement(
                'ul',
                null,
                libraries.map(function (l) {
                    return React.createElement(
                        'li',
                        null,
                        l.name,
                        React.createElement(
                            'a',
                            { href: l.url },
                            l.url
                        )
                    );
                })
            )
        );
    }
});

var libraries = [{ name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/' }, { name: 'AngularJS', url: 'https://angularjs.org/' }, { name: 'jQuery', url: 'http://jquery.com/' }, { name: 'Prototype', url: 'http://www.prototypejs.org/' }, { name: 'React', url: 'http://facebook.github.io/react/' }, { name: 'Ember', url: 'http://emberjs.com/' }, { name: 'Knockout.js', url: 'http://knockoutjs.com/' }, { name: 'Dojo', url: 'http://dojotoolkit.org/' }, { name: 'Mootools', url: 'http://mootools.net/' }, { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/' }, { name: 'Lodash', url: 'http://lodash.com/' }, { name: 'Moment', url: 'http://momentjs.com/' }, { name: 'Express', url: 'http://expressjs.com/' }, { name: 'Koa', url: 'http://koajs.com/' }];

// Render the SearchExample component on the page
/*
React.render(
    <SearchExample items={ libraries } />,
    document.body
);
*/
// This is more complex example that uses two components -
// a service chooser form, and the individual services inside it.

var ServiceChooser = React.createClass({
    displayName: 'ServiceChooser',

    getInitialState: function () {
        return { total: 0 };
    },

    addTotal: function (price) {
        this.setState({ total: this.state.total + price });
    },

    render: function () {

        var self = this;

        var services = this.props.items.map(function (s) {

            // Create a new Service component for each item in the items array.
            // Notice that I pass the self.addTotal function to the component.

            return React.createElement(Service, { name: s.name, price: s.price, active: s.active, addTotal: self.addTotal });
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Our services'
            ),
            React.createElement(
                'div',
                { id: 'services' },
                services,
                React.createElement(
                    'p',
                    { id: 'total' },
                    'Total ',
                    React.createElement(
                        'b',
                        null,
                        '$',
                        this.state.total.toFixed(2)
                    )
                )
            )
        );
    }
});

var Service = React.createClass({
    displayName: 'Service',

    getInitialState: function () {
        return { active: false };
    },

    clickHandler: function () {

        var active = !this.state.active;

        this.setState({ active: active });

        // Notify the ServiceChooser, by calling its addTotal method
        this.props.addTotal(active ? this.props.price : -this.props.price);
    },

    render: function () {

        return React.createElement(
            'p',
            { className: this.state.active ? 'active' : '', onClick: this.clickHandler },
            this.props.name,
            ' ',
            React.createElement(
                'b',
                null,
                '$',
                this.props.price.toFixed(2)
            )
        );
    }

});

var services = [{ name: 'Web Development', price: 300 }, { name: 'Design', price: 400 }, { name: 'Integration', price: 250 }, { name: 'Training', price: 220 }];

// Render the ServiceChooser component, and pass the array of services

React.render(React.createElement(ServiceChooser, { items: services }), document.body);
