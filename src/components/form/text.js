import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {Mode} from '../../constants';

import FormEditor from './editor';

import {createViewText} from '../mixinUtils';

import opts from './options/text'


const text = (props) => {

	opts.attributes.dataOptions.id='label_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);

  return (
		<FormEditor type="textElement">

		</FormEditor>
	);
}
export default text;
