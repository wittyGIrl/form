import classnames from 'classnames';
import {$, isObject, isNil} from '../../utils'

import Store from '../store';
import PopupSelector from './popupSelector';

import {getEnvironment} from './mixinUtils';

export default class JobTitleSelector extends PopupSelector{
	static defaultProps = {
		mode: 'default', // default, view, print
	};

	constructor(dom, props) {
		super(dom, props, 'jobTitleSelector');
	}
}
