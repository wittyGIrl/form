/*
*	单独文件定义 options，这样在 display 模式就可以不引用这些文件
*/
import {setOptions} from './index';
import config from '../../../config';
import {dataOptions} from './mixins/dataHasText';
//import {placeholder} from '../../../lang';
var placeholder=formLang.placeholder;
import {getLang} from '../../mixinUtils';

var groupVal='group_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
const data =  {
  isComputed: false,
  name: groupVal,
  type: 'int',
  length:50,
  defaultValue: {value: '', binding: ''},
  defaultText: {value: '', binding: ''},
  expression: '',
  hidden: '',
};
const options = {
	name: 'GroupSelector',
	attributes: {
		placeholder: {value: getLang(placeholder, 'groupSelector'), binding: ''},
		required: false,
		readOnly: false,
		multiSelect: false,
		width: '',
		dataOptions: data,
		style: {},
	},
};

const propOptions = {
	dataOptions,
	_options: {
		required: config.get('editors.checkbox'),
		multiSelect: config.get('editors.checkbox'),
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

setOptions('groupselector', {options, propOptions});
