/*
*	单独文件定义 options，这样在 display 模式就可以不引用这些文件
*/
import {setOptions} from './index';
import config from '../../../config';
import {data, dataOptions} from './mixins/dataHidden';

const options = {
	name: 'Row',
	attributes: {
		textAlign: '',
		dataOptions: data,
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
		type: {editor: config.get('editors.colType')},
		textAlign: {editor: config.get('editors.textAlign')},
		required: {editor: {type: 'checkbox'}},
		dataOptions: {
			hidden: true,
		},
	},
};

export default options;
export {propOptions};

setOptions('row', {options, propOptions});
