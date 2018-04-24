/*
* col
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {spacing} from '../../../theme';
import {isString, trim} from '../../../utils';
import {prefixUnitless} from '../../mixinUtils';

export default class Col extends Component{
	static propTypes = {
		width: PropTypes.oneOfType([
			PropTypes.number, // allow pixels
			PropTypes.string, // allow percentage
		]),
		children: PropTypes.node.isRequired,
		style: PropTypes.object,
	}

	render() {
		let {colSpan, rowSpan, className, width, height, textAlign, children, style, onClick, onDoubleClick, onContextMenu} = this.props;

		let componentClass = classnames('Col', className);
		var props = {};
		colSpan = this._prefixNumber(colSpan);
		rowSpan = this._prefixNumber(rowSpan);
		if(colSpan)props.colSpan = colSpan;
		if(rowSpan)props.rowSpan = rowSpan;
		style = Object.assign({
			width: prefixUnitless(width),
			height: prefixUnitless(height),
			textAlign,
		}, style);
		return (
			<td {...props} className={componentClass}
				onClick={onClick}
				onDoubleClick={onDoubleClick}
				onContextMenu={onContextMenu}
				style={style}
			>
				{children}
			</td>
		);
	}

	// 预处理数字，可能出现百分比的形式
	_prefixNumber(num){
		num = trim(num);
		if(isString(num)){
			var index = num.indexOf('%');
			if(~index){
				return num;
			}
		}
		num -= 0;
		if(isNaN(num))return false;
		return num;
	}
}
