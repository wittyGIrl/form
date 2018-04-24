/*
*	form
*/
import {setOptions} from './index';
import config from '../../../config';
import {data, dataOptions} from './mixins/dataHidden';

var blockVal='block_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
const options = {
	name: 'Block',
	attributes: {
		id:blockVal,
		title: {
			value: '',
			binding: '',
		},

		dataOptions: data,
		textAlign: 'center',
		style: {},
	},
};

const propOptions = {
	dataOptions,
	_options: {
		style: {
			keyEditable: true,
			defaultChild: {'':''},
		},
		dataOptions: {
			hidden: true,
		},
		title: config.get('options.bindingValue'),
		id: {
			hidden: true
		},
	//	modelType: config.get('options.bindingFunc'),
		textAlign: {editor: config.get('editors.textAlign')},
	},
};

export default options;
export {propOptions};

setOptions('block', {options, propOptions});
