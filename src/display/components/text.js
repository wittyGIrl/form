import classnames from 'classnames';
import {$, isNil, isObject} from '../../utils'

import Component from './component';

import {getEnvironment} from './mixinUtils';

export default class Text extends Component{

  constructor(target, props) {
    super(target, props);
    this._prefixOptions();
		this.render();
  }

  _prefixOptions(){
    if(isObject(this.props.value)){
      this.props.value = getEnvironment(this.props.value.binding, this.props.value.value);
    }
  }

  _shouldRender(){
    return false;
  }

	render() {
    this.dom.html(this.props.value);
    return this;
  }
}
