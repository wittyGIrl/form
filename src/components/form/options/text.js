/*
*	form
*/
import {setOptions} from './index';
import config from '../../../config';

const options = {
	name: 'Text',
	attributes: {
		value: {
			value: 'label',
			binding: '',
		},
	},
};

const propOptions = {
	_options: {
		value: config.get('options.bindingValue'),
	},
};

export default options;
export {propOptions};

setOptions('text', {options, propOptions});
