import {setOptions} from './index';
import config from '../../../config';
import {dataOptions} from './mixins/data';

var checkVal='checkbox_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
var data =  {
  isComputed: false,
  name: checkVal,
  type: 'bool',
  length:50,
  defaultValue: {value: '', binding: ''},
  expression: '',
  hidden: '',
};
const options = {
	name: 'LabeledCheckbox',
	attributes: {
    off: false,
    on: true,
		readOnly: false,
		style: {},
		dataOptions: data,
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
		readOnly: {
			editor: {type: 'checkbox'},
		},
	},
};

export default options;
export {propOptions};

setOptions('labeledcheckbox', {options, propOptions});
