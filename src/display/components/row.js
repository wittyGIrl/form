import classnames from 'classnames';
import {$, isNil, isObject} from '../../utils'

import Component from './component';


export default class Row extends Component{

  constructor(target, props) {
    super(target, props);
		this.render();
    if(!isNil(this.props.textAlign)){
      this.dom.css({textAlign: this.props.textAlign});
    }
  }

	render() {
    this[this.props.hidden === true ? 'hide' : 'show']();
  }
}
