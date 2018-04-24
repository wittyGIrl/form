import {setOptions} from './index';
import config from '../../../config';
import {dataOptions} from './mixins/data';
//import {placeholder, kit} from '../../../lang';
var placeholder=formLang.placeholder;
var kit=formLang.kit;
import {getLang} from '../../mixinUtils';

var radioVal='radio_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
var data =  {
  isComputed: false,
  name: radioVal,
  type: 'string',
  length:50,
  defaultValue: {value: '', binding: ''},
  expression: '',
  hidden: '',
};
const options = {
	name: 'LabeledRadio',
	attributes: {
		readOnly: false,
		options: [
			{text: {value: getLang(placeholder, 'option1'), binding: ''}, value: '1'},
			{text: {value: getLang(placeholder, 'option2'), binding: ''}, value: '2'}
		],
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
		options: {
			defaultChild: {
				text: {value: '', binding: ''}, value: '',
				_options: {
					text: config.get('options.bindingValue'),
				},
			},
			//childOptions
			childName: 'option',
		},
		readOnly: {
			editor: {type: 'checkbox'},
		},
	},
	options: {_options: {text: config.get('options.bindingValue')}},
};

export default options;
export {propOptions};

setOptions('labeledradio', {options, propOptions});
