/*
* 日期控件
*/

import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {Mode} from '../../constants';

import FormEditor from './editor';

import {createViewText} from '../mixinUtils';

//import {button} from '../../lang';
var button=formLang.button;
var tabs=formLang.tabs;
import opts from './options/labeledDatebox'

const LabeledDatebox = (props) => {
	var {value, label, placeholder, todayButton, displayMode, ...others} = props;
	todayButton = todayButton === true ? button.today: null;
	opts.attributes.dataOptions.id=opts.attributes.dataOptions.name='datebox_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
	return (
		<FormEditor {...others} value={value} type="textbox"
			todayButton={todayButton} placeholder={placeholder.value} required={false}>
		</FormEditor>
	);
}
export default LabeledDatebox;
