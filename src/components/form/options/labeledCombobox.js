import {setOptions} from './index';
import config from '../../../config';
import {dataOptions} from './mixins/data';
//import {placeholder} from '../../../lang';
var placeholder=formLang.placeholder;
import {getLang} from '../../mixinUtils';

var comboboVal='combobox_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
var data =  {
  isComputed: false,
  name: comboboVal,
  type: 'string',
  length:50,
  defaultValue: {value: '', binding: ''},
  expression: '',
  hidden: '',
};
const options = {
	name: 'LabeledCombobox',
	attributes: {
		url: '',
		readOnly: false,
		editable: false,
		width: '',
		options: [{text: {value: getLang(placeholder, 'select'), binding: ''}, value: ''}, {text: {value: getLang(placeholder, 'option1'), binding: ''}, value: '1'}],
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
		options: {
			defaultChild: {
				text: {value: '', binding: ''}, value: '',
				_options: {text: config.get('options.bindingValue')},
			},
			//childOptions
			childName: 'option',
		},
		dataOptions: {
			hidden: true,
		},
		readOnly: config.get('editors.checkbox'),
		editable: config.get('editors.checkbox'),
	},
	options: {_options: {text: config.get('options.bindingValue')}},
};

export default options;
export {propOptions};

setOptions('labeledcombobox', {options, propOptions});
