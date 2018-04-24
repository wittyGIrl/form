/*
* 日期范围控件
*/
import {setOptions} from './index';
import config from '../../../config';
//import {placeholder} from '../../../lang';
var placeholder=formLang.placeholder;
import {getLang} from '../../mixinUtils';

const dataOptions = {
	isComputed: {
		editor: {type: 'checkbox'},
	},
	name: {
		hidden: {
			targetName: 'isComputed',
			targetValues: false,
		}
	},
	type: {
		editor: config.get('editors.type'),
		hidden: {
			targetName: 'isComputed',
			targetValues: false,
		}
	},
	defaultValue: {
		hidden: {
			targetName: 'isComputed',
			targetValues: false,
		}
	},
	displayName: {
		hidden: {
			targetName: 'isComputed',
			targetValues: false,
		}
	},
	expression: {
		hidden: {
			targetName: 'isComputed',
			targetValues: true,
		}
	},
};

const options = {
	name: 'LabeledDateboxRange',
	attributes: {
		startPlaceholder: {value: getLang(placeholder, 'dateRangeStart'), binding: ''},
		endPlaceholder: {value: getLang(placeholder, 'dateRangeEnd'), binding: ''},
		dateFormat: 'YYYY-MM-DD',
		todayButton: true,
		readOnly: false,
		showYearDropdown: false,
		data: {
			startData: {
				isComputed: false,
				name: '',
				type: '',
				defaultValue: '',
				displayName: '',
				expression: '',
			},
			endData: {
				isComputed: false,
				name: '',
				type: '',
				defaultValue: '',
				displayName: '',
				expression: '',
			},
			hidden: '',
		},
		style: {},
		labelStyle: {},
	},
};

const propOptions = {
	data: {
		startData: {
			_options: dataOptions,
		},
		endData: {
			_options: dataOptions,
		},
	},
	_options: {
		required: {
			editor: {type: 'checkbox'},
		},
		todayButton: {
			editor: {type: 'checkbox'},
		},
		readOnly: {
			editor: {type: 'checkbox'},
		},
		showYearDropdown: {
			editor: {type: 'checkbox'},
		},
		style: {
			keyEditable: true,
			defaultChild: {'':''},
		},
		labelStyle: {
			keyEditable: true,
			defaultChild: {'':''},
		},
		data: {
			hidden: true,
		},
		startPlaceholder: config.get('options.bindingValue'),
		endPlaceholder: config.get('options.bindingValue'),
	},
};

export default options;
export {propOptions};

setOptions('labeleddateboxrange', {options, propOptions});
