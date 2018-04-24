import classnames from 'classnames';
import {$, isNil, isObject} from '../../utils'

import Store from '../store';
import Component from './component';

import {setAttr, getEnvironment} from './mixinUtils';

export default class Block extends Component{

  constructor(target, props) {
    super(target, props);
    this._prefixOptions();
		this._create();
		this.render();
  }
  _prefixOptions(){
    this.props.title = getEnvironment(this.props.title.binding, this.props.title.value);
    this.props.id=this.props.id;
  }

  _create(){
    var borderStyle="border:1px solid #ccff99;margin-top:-1px;"
		var title = $('<span class="x-block-title"></span>').html(this.props.title);
		var content = $('<div class="x-block-content" style="'+borderStyle+'" id='+this.props.id+'>');
		var border = $('<div class="x-block-border" >').append(title).append(content);
		content.append(this.dom.children());
		this.dom.addClass('x-block-outer').append(border);
    this.title = title;
    if(!isNil(this.props.textAlign)){
      this.dom.css({textAlign: this.props.textAlign});
    }
  }

	render() {
    this.title.html(this.props.title);
    this[this.props.hidden === true ? 'hide' : 'show']();
    return this;
  }
}
