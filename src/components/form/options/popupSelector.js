/*
*	单独文件定义 options，这样在 display 模式就可以不引用这些文件
*/
import {setOptions} from './index';
import config from '../../../config';
import {dataOptions} from './mixins/dataHasText';
//import {placeholder, kit} from '../../../lang';
var placeholder=formLang.placeholder;
var kit=formLang.kit;
import {getLang} from '../../mixinUtils';

var popupVal='popup_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
const data =  {
  isComputed: false,
  name: popupVal,
  type: 'int',
  length:50,
  defaultValue: {value: '', binding: ''},
  defaultText: {value: '', binding: ''},
  expression: '',
  hidden: '',
};
const options = {
	name: 'PopupSelector',
	attributes: {
		placeholder: {value: getLang(placeholder, 'select'), binding: ''},
		required: false,
		readOnly: false,
		url: '',
		width: '',
		dataOptions: data,
		style: {},
	},
};

const propOptions = {
	dataOptions,
	_options: {
		required: config.get('editors.checkbox'),
		multiline: config.get('editors.checkbox'),
		readOnly: config.get('editors.checkbox'),
		style: {
			keyEditable: true,
			defaultChild: {'':''},
		},
		dataOptions: {
			hidden: true,
		},
		placeholder: config.get('options.bindingValue'),
	},
};

export default options;
export {propOptions};

setOptions('popupselector', {options, propOptions});
