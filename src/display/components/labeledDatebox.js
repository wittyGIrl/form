import classnames from 'classnames';
import {$, isObject} from '../../utils'

import Store from '../store';
import LabeledTextbox from './labeledTextbox';

export default class LabeledDatebox extends LabeledTextbox{
	static defaultProps = {
    mode: 'default', // default, view, print
	};

  constructor(dom, props) {
    super(dom, props, 'datebox');
  }
}
