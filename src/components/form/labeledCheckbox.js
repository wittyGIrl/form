import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {Mode} from '../../constants';

import FormEditor from './editor';

import {createViewText} from '../mixinUtils';

import opts from './options/labeledCheckbox'

const LabeledCheckbox = (props) => {
	opts.attributes.dataOptions.id=opts.attributes.dataOptions.name='checkbox_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
	return (
		<FormEditor {...props} type="checkbox">
		</FormEditor>
	);
}
export default LabeledCheckbox;
