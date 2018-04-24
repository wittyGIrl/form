import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {Mode} from '../../constants';

import FormEditor from './editor';

import {createViewText} from '../mixinUtils';

import opts from './options/employeeSelector'

const employeeSelector = (props) => {
	let {placeholder} = props;
	placeholder = placeholder.value;
	opts.attributes.dataOptions.id=opts.attributes.dataOptions.name='employee_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
	return (
		<FormEditor type="textbox"
			placeholder={placeholder}>
		</FormEditor>
	);
}
export default employeeSelector;
