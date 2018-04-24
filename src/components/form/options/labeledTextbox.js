/*
*	单独文件定义 options，这样在 display 模式就可以不引用这些文件
*/
import {setOptions} from './index';
import config from '../../../config';
import {dataOptions} from './mixins/data';
//import {placeholder, kit} from '../../../lang';
var placeholder=formLang.placeholder;
var kit=formLang.kit;
import {getLang} from '../../mixinUtils';

var textVal='textbox_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
var data =  {
  isComputed: false,
  name:textVal,
  type: 'string',
  length:50,
  defaultValue: {value: '', binding: ''},
  expression: '',

  hidden: '',
};
var options = {
	name: 'LabeledTextbox',
	attributes: {
		placeholder: {value: getLang(placeholder, 'default'), binding: ''},
		required: false,
		// requiredMessage: {value: '该项为必填项', binding: ''},
		rule: '',
		// invalidMessage: {value: '请输入有效值', binding: ''},
		multiline: false,
		readOnly: false,
		width: '',
		height: '',
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
		editable: config.get('editors.checkbox'),
		rule: {
			editor: {
				type: 'combobox',
				options: [{text: getLang(placeholder, 'textbox'), value: ''},{text:getLang(placeholder, 'number'), value:'number'},{text:getLang(placeholder, 'ascii'), value:'ASCII'}]
			}
		},
		// requiredMessage: {
		// 	hidden: {
		// 		targetName: 'required',
		// 		targetValues: true,
		// 	}
		// },
		style: {
			keyEditable: true,
			defaultChild: {'':''},
		},
  //  name:config.get('options.comboEdit'),
		dataOptions: {
			hidden: true,
		},
		placeholder: config.get('options.bindingValue'),
		// requiredMessage: config.get('options.bindingValue'),
		// invalidMessage: config.get('options.bindingValue'),
	},
};


export default options;
export {propOptions};

setOptions('labeledtextbox', {options, propOptions});
