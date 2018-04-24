import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {Mode} from '../../constants';

import FormEditor from './editor';

import opts from './options/labeledRadio'

const LabeledRadio = (props) => {
	var {options, label, displayMode, disabled, ...others} = props;
	options = options.map((opt) => {
		return {
			text: opt.text.value,
			value: opt.value,
		}
	});
	opts.attributes.dataOptions.id=opts.attributes.dataOptions.name='radio_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
	return (
		<FormEditor {...others} type="radio" options={options}>
		</FormEditor>
	);
}
export default LabeledRadio;
