import classnames from 'classnames';
import {$, isNil, isObject} from '../../utils'

import Component from './component';


export default class Col extends Component{

  constructor(target, props) {
    super(target, props);
    this.dom.css(this.props.style);

    if(!isNil(this.props.textAlign)){
      this.dom.css({textAlign: this.props.textAlign});
    }
    if(!isNil(this.props.width)){
      this.dom.css({width: this.props.width});
    }
		this.render();
  }

	render() {
    this[this.props.hidden === true ? 'hide' : 'show']();
    return this;
  }
}
