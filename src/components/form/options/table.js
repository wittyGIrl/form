/*
*	form
*/
import {setOptions} from './index';
import config from '../../../config';
import {data, dataOptions} from './mixins/dataHidden';

const options = {
	name: 'Form',
	attributes: {
	  cellspacing: "0",
    cellpadding: "3",
		dataOptions: data,
		style: {},
	},
};

const propOptions = {
	dataOptions,
	_options: {
		style: {
			keyEditable: true,
			defaultChild: {'':''},
		},
		cellspacing: {hidden: true},
	},
};

export default options;
export {propOptions};

setOptions('table', {options, propOptions});
