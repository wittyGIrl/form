/*
*	form
*/
import {setOptions} from './index';
import config from '../../../config';
//import lang, {message} from '../../../lang';
var message=formLang.message;
var lang=formDefaults;
const options = {
	name: 'Form',
	attributes: {
		title: {
			value: lang.defaultName,
			binding: '',
		},
		datasource: {
			modeltype: '',
			modelformat:'modeltablename',
		},
		theme: 'default',
		textAlign: 'center',
		script: {value:''},
		style: {},
	},
};

const propOptions = {
	_options: {
		script: Object.assign(
      config.get('options.bindingJsFile')
    ),
		style: {
			keyEditable: true,
			defaultChild: {'':''},
		},
		title: config.get('options.bindingValue'),
		datasource: config.get('options.bindingFunc'),
		theme: {editor: config.get('editors.theme')},
		textAlign: {editor: config.get('editors.textAlign')},
	},
};

export default options;
export {propOptions};

setOptions('form', {options, propOptions});
