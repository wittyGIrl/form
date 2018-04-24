/*
* 表格控件
*/
import {setOptions} from './index';
import config from '../../../config';
import {extend} from '../../../utils';
//import {placeholder, kit} from '../../../lang';
var placeholder=formLang.placeholder;
var kit=formLang.kit;
import {getLang} from '../../mixinUtils';

var editor = {
	type: 'textbox',
	textboxOptions: {
		placeholder: {value: getLang(placeholder, 'default'), binding: ''},
		required: false,
		//requiredMessage: {value: '该项为必填项', binding: ''},
		// rule: '',
		//invalidMessage: {value: '请输入有效值', binding: ''},
		multiline: false,
	},
	comboboxOptions: {
		options: [{text: getLang(placeholder, 'select'), value: ''}, {text: getLang(placeholder, 'option1'), value: '1'}],
	},
	checkboxOptions: {
		on: true,
		off: false,
	},
	radioOptions: {
		options: [{text: getLang(placeholder, 'select'), value: ''}, {text: getLang(placeholder, 'option1'), value: '1'}],
	},
	dateboxOptions: {
		placeholder: {value: getLang(placeholder, 'datebox'), binding: ''},
		// dateFormat: 'YYYY-MM-DD',
		// todayButton: true,
		// showYearDropdown: false,
	},
};

const editorOptions = {
	textboxOptions: {
		_options: {
			required: {
				editor: {type: 'checkbox'},
			},
			multiline: {
				editor: {type: 'checkbox'},
			},
			requiredMessage: {
				hidden: {
					targetName: 'required',
					targetValues: true,
				},
			},
			placeholder: config.get('options.bindingValue'),
		},
	},
	comboboxOptions: {
		_options: {
			options: {
				defaultChild: {
					text: {value: '', binding: ''}, value: '',
					_options: {text: config.get('options.bindingValue')},
				},
				//childOptions
				childName: 'option',
			},
		},
		options: {_options: {text: config.get('options.bindingValue')}},
	},

	radioOptions: {
		_options: {
			options: {
				defaultChild: {
					text: {value: '', binding: ''}, value: '',
					_options: {text: config.get('options.bindingValue')},
				},
				//childOptions
				childName: 'option',
			},
		},
		options: {_options: {text: config.get('options.bindingValue')}},
	},
	dateboxOptions: {
		_options: {
			todayButton: {
				editor: {type: 'checkbox'},
			},
			showYearDropdown: {
				editor: {type: 'checkbox'},
			},
			placeholder: config.get('options.bindingValue'),
		},
	},

	_options: {
		type: {
			editor: {
				type: 'combobox',
				options: [
					{text: getLang(kit, 'textbox'), value: 'textbox'},
					{text: getLang(kit, 'combobox'), value: 'combobox'},
					{text: getLang(kit, 'checkbox'), value: 'checkbox'},
					{text: getLang(kit, 'radio'), value: 'radio'},
					{text: getLang(kit, 'datebox'), value: 'datebox'}
				],
			},
		},
		textboxOptions: {
			hidden: {
				targetName: 'type',
				targetValues: 'textbox',
			}
		},
		comboboxOptions: {
			hidden: {
				targetName: 'type',
				targetValues: 'combobox',
			}
		},
		checkboxOptions: {
			hidden: {
				targetName: 'type',
				targetValues: 'checkbox',
			}
		},
		radioOptions: {
			hidden: {
				targetName: 'type',
				targetValues: 'radio',
			}
		},
		dateboxOptions: {
			hidden: {
				targetName: 'type',
				targetValues: 'datebox',
			}
		},
		options: editor,
	}
};

const options = {
	name: 'Datagrid',
	attributes: {
    label: {value: getLang(placeholder, 'datagrid'), binding: ''},
		idField: 'id',
		multiSelect: false,
		fit: false,
		fitColumns: true,
		toolbar: true,

		// inlineEdit: false,

		rowNumber: true,
		rowNumberWidth: 20,
		pagination: false,
		pageSize: 10,
		// paginationLabel: 'Displaying {start} to {end} of {total} items',
		columns: [
		  {field: 'id', label: {value: 'id', binding: ''}, width: '100', hidden: true, editor: extend(true, {}, editor)},
			{field: 'text', label: {value: 'text', binding: ''}, width: '100', hidden: false, editor: extend(true, {}, editor)},
		],

    dataOptions: {
			name: '',
			type: 'object',
			isComputed: false,
			//defaultValue: '',
			hidden: '',
			// onChange: '', //function name
		},
		style: {},
	},
};

const propOptions = {
	dataOptions: {
		_options: {
			type: {
				hidden: true, // datagrid 的数据类型只能是字符串
			},
			isComputed: { hidden: true },
		}
	},
	columns: {
		editor: editorOptions,
		_options: {label: config.get('options.bindingValue')},
	},
	_options: {
		columns: {
			_collaped: true,
			defaultChild: function(){
				return {
					field: '', label: {value:'', binding: ''}, width: '100', hidden: false,
					editor: extend(true, {}, editor, editorOptions),
					_options: {
						field: {
							editor: {autofocus: true},
						},
						label: config.get('options.bindingValue'),
					},
				};
			},
			//childOptions
			childName: 'column',
			childOptions: {
				hidden: {
					editor: {type: 'checkbox'}
				},
				editor: {
					hidden: {
						targetName: 'hidden',
						targetValues: false,
					},
				},
			},
		},
		rowNumberWidth: {
			hidden: {
				targetName: 'rowNumber',
				targetValues: true,
			},
		},
		pagination: {
			editor: {type: 'checkbox'},
		},
		pageSize: {
			hidden: {
				targetName: 'pagination',
				targetValues: true,
			}
		},
		paginationLabel: {
			hidden: {
				targetName: 'pagination',
				targetValues: true,
			}
		},
		fit: {
			editor: {type: 'checkbox'},
		},
		fitColumns: {
			editor: {type: 'checkbox'},
		},
		toolbar: {
			editor: {type: 'checkbox'},
		},

		inlineEdit: {
			editor: {type: 'checkbox'},
		},

		style: {
			keyEditable: true,
			defaultChild: {'':''},
		},
		dataOptions: {
			hidden: true,
		},
		label: config.get('options.bindingValue'),
	}
};

export default options;
export {propOptions};

setOptions('datagrid', {options, propOptions});
