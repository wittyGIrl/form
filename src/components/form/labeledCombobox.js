import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {Mode} from '../../constants';

import FormEditor from './editor';

import opts from './options/labeledCombobox'

const LabeledCombobox = (props) => {
	var {value, label, options,displayMode, ...others} = props;
	options = options.map((opt) => {
		return {
			text: opt.text.value,
			value: opt.value,
		}
	});
	opts.attributes.dataOptions.id=opts.attributes.dataOptions.name='combobox_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
	return (
		<FormEditor {...others} type="combobox" value={value} options={options}>
		</FormEditor>
	);
}
export default LabeledCombobox;
