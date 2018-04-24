import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {Mode} from '../../constants';

import FormEditor from './editor';

import {createViewText} from '../mixinUtils';

import options from './options/labeledTextbox'

const LabeledTextbox = (props) => {
	let {placeholder, requiredMessage, invalidMessage, displayMode, ...others} = props;
	placeholder = placeholder.value;
	options.attributes.dataOptions.id=options.attributes.dataOptions.name='textbox_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
	return (
		<FormEditor {...others} type="textbox"
			placeholder={placeholder} required={false}>
		</FormEditor>
	);
}

export default LabeledTextbox;
