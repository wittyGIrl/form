import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import classNames from 'classnames';

const ALERT_TYPES = [
	'danger',
	'error', // alias for danger
	'info',
	'primary',
	'success',
	'warning'
];

export default class Alert extends Component{
	static propTypes = {
		type: PropTypes.string,
		className: PropTypes.string,
	}

	constructor(props, context){
		super(props, context);
	 	this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		var {type, className, children} = this.props;
		var componentClass = classNames(
			'Alert',
			'Alert--' + type,
			className
		);

		return (
			<div className={componentClass}>
				{children}
			</div>
		);
	}
}
