import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {spacing} from '../../../theme';

export default class Row extends Component{
	static propTypes = {
		children: PropTypes.node.isRequired,
		className: PropTypes.string,
		gutter: PropTypes.number,
		style: PropTypes.object,
	};
	static defaultProps = {
		gutter: spacing.gutter,
	};

	render() {
		let { className, gutter, style, target, children, ...props } = this.props;

		let componentClass = classnames('row', className);

		return (
			<tr style={style} className={componentClass}>
				{children}
			</tr>
		);
	}
}
