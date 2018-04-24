/*
*	单独文件定义 options，这样在 display 模式就可以不引用这些文件
*/
import {setOptions} from './index';
import config from '../../../config';

const options = {
	name: 'Col',
	attributes: {
		colSpan: '1',
		rowSpan: '1',
		width: '',
		height: '',
		textAlign: '',
		required: false,
		type: '',
		dataOptions: {hidden: ''},
		style: {},
	},
};

const propOptions = {
	_options: {
		style: {
			keyEditable: true,
			defaultChild: {'':''},
		},
		type: {editor: config.get('editors.colType')},
		textAlign: {editor: config.get('editors.textAlign')},
		required: {editor: {type: 'checkbox'}},
		dataOptions: {
			hiddenItself: true,
		},
	},
};

export default options;
export {propOptions};

setOptions('col', {options, propOptions});
