import classnames from 'classnames';
import {$, isNil, isObject} from '../../utils'

import Store from '../store';
import Component from './component';

import {setAttr, getEnvironment} from './mixinUtils';

export default class Form extends Component{
  constructor(target, props) {
    super(target, props)
    this._prefixOptions();
		this._create();
		this.render();
  }
  _prefixOptions(){
    this.props.title = getEnvironment(this.props.title.binding, this.props.title.value);
  }

  _create(){
		this.title = $('<h1 class="x-form-title"></h1>');
		this.dom.prepend(this.title);
    if(this.props.theme){
      this.dom.addClass(`x-theme-${this.props.theme}`);
    }

    if(!isNil(this.props.textAlign)){
      this.dom.css({textAlign: this.props.textAlign});
    }
  }
	render() {
    // if(this.props.script.value){
    //   var script = document.createElement("script");
    //   script.src = this.props.script.value;
    //   document.head.appendChild(script);
    // }//添加脚本内容
    this.title.html(this.props.title);
    this[this.props.hidden === true ? 'hide' : 'show']();
	}
}
