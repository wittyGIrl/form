/*
* row DragDrop
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import InkBar from 'material-ui/Tabs/InkBar';
import {blue500} from 'material-ui/styles/colors';

import {isArray} from '../../utils';

import Row from './common/row';
import Col from './col';

import DragDrop from '../draggable/dragDrop';

import Actions from '../../actions';

const FormRow = (props) => {
	let {className, target, height, children, ...others} = props;
	var selected = target.isSelected();
	let componentClass = classnames(className, {
		selected,
	});
	var inkbar = null;

	var last = (
		<Col width="3%" target={target} colspan={1}>
			<div style={{height: '20px'}}></div>
		</Col>
	);

	return (
		<Row {...others} className={componentClass}>
			{children}
			{last}
		</Row>
	);
}
export default FormRow;
