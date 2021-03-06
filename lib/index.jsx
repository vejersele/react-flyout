var React = require('react');
var getParents = require('./utils').getParents;


module.exports = React.createClass({


	/* Component methods
	-----------------------------------------
	----------------------------------------- */
	getInitialState: function () {

		return {
			isOpen: false
		};
	},

	toggle: function () {

		if(this.state.isOpen) {
			this.close();
		}else {
			this.open();
		}
	},

	open: function () {

		this.setState({isOpen: true});

		document.addEventListener('click', this.onDocumentClick);
	},

	close: function () {

		this.setState({isOpen: false});

		document.removeEventListener('click', this.onDocumentClick);
	},


	/* Event handlers
	-----------------------------------------
	----------------------------------------- */
	onButtonClick: function (e) {
		this.toggle();
	},

	onDocumentClick: function (e) {
		var parents, matchesEl;

		console.log('test')

		parents = getParents(e.target);
		matchesEl = false;

		for(var i = 0, iLen = parents.length; i < iLen; i ++) {

			if(parents[i] === this.getDOMNode()) {
				matchesEl = true;
				break;
			}
		}

		if(!matchesEl) {
			this.close();
		}

	},


	/* Render
	-----------------------------------------
	----------------------------------------- */
	render: function () {

		var classes = 'flyout';

		if(this.state.isOpen) {
			classes += ' is-open';
		}

		var buttonText = (this.state.isOpen) ? 'close' : 'open';

		return (
			<div className={classes}>
				<div className="flyout__header">
					<button type="button" className="flyout__toggle" onClick={this.onButtonClick}>{buttonText}</button>
				</div>
				<div className="flyout__body">
					{this.props.children}
				</div>
			</div>
		)
	}

});


