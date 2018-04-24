import {styles} from '../../../theme';
import config from '../../../config';
import Store from '../../../stores';
import Actions from  '../../../actions';
import FormElement from '../../../core/formElement';

import Alert from '../../common/alert';

import Editor from 'editors';

import {register} from 'json-editor/lib/common/editor';

import {getLang} from '../../mixinUtils';
import options from '../options/labeledTextbox';
import {setOptions} from '../options/index';
import FormEditor from '../editor';
/*
 提供数据库字段的json数据转换，使数据在表单中可以
 正确显示。
*/
function isEdit(json){
  if(json.isKey ||json.readOnly ||json.isComputed)
  return true;
  return false;
}
export function getCol(){
  const options={
		colSpan: '1',
		rowSpan: '1',
		width: '',
		height: '',
		textAlign: '',
		required: false,
		type: '',
		dataOptions: {hidden: ''},
		style: {},
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
  var returnObj=new Object();
  returnObj.attributes=options;
  returnObj.children=null;
  returnObj.parent=null;
  returnObj.name="Col";
  return returnObj;
}
export function getTextBox(json){
  const data =  {
    id:json.columnName,
    isComputed: json.isComputed||false,
    name:json.columnName,
    type: json.columnType||'string',
    length:json.length||50,
    defaultValue: {value: json.defaultValue, binding: ''},
    expression: '',

    hidden: '',
    _options:{
      isComputed:{editor: {type: 'checkbox'}},
      defaultValue: config.get('options.bindingValue'),
      type:{
          editor: config.get('editors.type'),
      },
      length:{
        hidden:{
          targetName: 'type',
          targetValues: 'string',
        }
      },
    }
  };
  const options = {
      id:'',
  		placeholder: {value: json.columnName, binding: ''},
  		required: json.isRequired|| false,
  		rule: '',
  		multiline: false,
  		readOnly: isEdit(json),
  		width: '',
  		height: '',
  		dataOptions: data,
  		style: {},
  	  _options: {
    		required: config.get('editors.checkbox'),
    		multiline: config.get('editors.checkbox'),
    		readOnly: config.get('editors.checkbox'),
    		editable: config.get('editors.checkbox'),
    		rule: {
    			editor: {
    				type: 'combobox',
    				options: [{text: '请选择', value: ''},{text:'数字', value:'number'},{text:'数字和字母', value:'ASCII'}]
    			}
    		},
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

  var returnObj=new Object();
  returnObj.attributes=options;
  returnObj.children=null;
  returnObj.data=null;
  returnObj.name='LabeledTextbox';
  return returnObj;
}
export function getLabel(json){
  const options = {
  		value: {
  			value: json.columnName,
  			binding: '',
  	},
    _options:{
  		value: config.get('options.bindingValue'),
  	},
  };
  var returnObj=new Object();
  returnObj.attributes=options;
  returnObj.children=null;
  returnObj.parent=null;
  returnObj.name="Text";
  return returnObj;
}
//export getObject;
