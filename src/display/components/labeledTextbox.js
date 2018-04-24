import classnames from 'classnames';
import {$, isObject, isNil} from '../../utils'

import Store from '../store';
import Component from './component';

import {getEnvironment} from './mixinUtils';

export default class LabeledTextbox extends Component{
	static defaultProps = {
    mode: 'default', // default, view, print
	};

  constructor(dom, props, plugin) {
    super(dom, props);
		this.plugin = plugin || 'textbox';
		if(this.props.placeholder){
	    this.props.prompt = getEnvironment(this.props.placeholder.binding, this.props.placeholder.value);
	  }
		this.props.readonly = this.props.readOnly;
		if(this._prefixOptions){
			this._prefixOptions();
		}
		this._prefixDataOptions();
		if(this.props.mode === 'default'){
			this.onChange = this.props.onChange;
			this.props.onChange = this._handleChange;
			this.dom.attr('name', this.props.name);
			this.dom.attr('id', this.props.id);
			if(this.props.multiline){
				if(!this.props.width){
					this.props.width = '160px';
				}
				if(!this.props.height){
					this.props.height = '70px';
				}
			}
			this.dom[this.plugin](this.props);
		} else {
			this.dom.hide();
			var value = this.props.value;
			if(isNil(value)) value = '';
			this.dom.after(`<span class="x-editor-noedit">${value}</span>`);
		}
		this.render();
  }

	render() {
		var {value, mode, hidden,id} = this.props;
		if(mode === 'default'){
			this.rendering = true;
			this.dom[this.plugin]('setValue', value);
			this.rendering = false;
		} else {
			this.dom.next().html(value);
		}
		if(hidden === true) this.hide();
		else this.show();
		return this;
	}
	hide(){
		if(this.props.mode === 'default'){
			this.dom.data().textbox.textbox.hide();
		} else {
			this.dom.next().hide();
		}
		return this;
	}
	show(){
		if(this.props.mode === 'default'){
			this.dom.data().textbox.textbox.show();
		} else {
			this.dom.next().show();
		}
		return this;
	}

	_handleChange = (newValue, oldValue) => {
		if(this.rendering)return;
    var {name, field, value} = this.props;
		if(newValue === value)return;
    if(field){
      Store.setData(field, newValue);
    } else if(name){
      Store.setData(name, newValue);
    } else {
      this.props.value = newValue;
      this.render();
    }
		if(this.onChange){
			this.onChange.call(this.dom, newValue, oldValue);
		}
	}
}
