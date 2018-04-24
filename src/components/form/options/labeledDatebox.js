import {setOptions} from './index';
import config from '../../../config';
//import {dataOptions} from './mixins/data';
//import {placeholder} from '../../../lang';
var placeholder=formLang.placeholder;
import {getLang} from '../../mixinUtils';

var dataVal='datebox_'+(+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
var data =  {
  isComputed: false,
  name: dataVal,
  type: 'datetime',
  length:50,
  defaultValue: {value:'',binding:''},
  expression: '',
  hidden: '',
};
const dataOptions = {
  _options: {
    isComputed: {
      editor: {type: 'checkbox'},
    },
  //  name: config.get('options.comboEdit'),
    type: {
      editor: config.get('editors.type'),
      hidden: {
        targetName: 'computed',
        targetValues: false,
      }
    },
    length:{
      hidden:{
        targetName: 'type',
        targetValues: 'string',
      }
    },
    defaultValue: Object.assign(
      config.get('options.bindingDate')
    ),
    expression: {
      hidden: {
        targetName: 'isComputed',
        targetValues: true,
      }
    },
  }
};
const options = {
	name: 'LabeledDatebox',
	attributes: {
		placeholder: {value: getLang(placeholder, 'datebox'), binding: ''},
		readOnly: false,
		editable: false,
		width: '',
		height:'',
		dataOptions: data,
		style: {},
	},
};
const propOptions = {
	dataOptions,
	_options: {
		readOnly: config.get('editors.checkbox'),
		editable: config.get('editors.checkbox'),

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

setOptions('labeleddatebox', {options, propOptions});
