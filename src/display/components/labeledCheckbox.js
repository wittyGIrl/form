import classnames from 'classnames';
import {$, isNil, isString} from '../../utils'

import Store from '../store';
import Component from './component';

export default class LabeledCheckbox extends Component{
	static defaultProps = {
		type: 'default',
		name: null,
    mode: 'default', // default, view, print
    value: 0,
		on: true,
    off: false,
    readOnly: null,
    disabled: null,
	};

  constructor(target, props) {
    super(target, props)
		this._prefixDataOptions();
		var {value, options} = this.props;
		if(isNil(value)){
			if(isNil(value)){
	      value = 0;
	    }
			this.props.value = value;
		}
		this._create();
		this.init();
		this.render();
  }

  _create(){
		let {className, readOnly, mode, value, name} = this.props;
		this.dom.hide();
    this.editor = $('<input type="checkbox"></input>');
		this.target = $('<label></label>');
		this.target.append(this.editor);
		this.dom.after(this.target);
		if(mode === 'default'){
			this.editor.bind('change', this._handleChange);
			if(readOnly){
				this.value = $('<input type="hidden"></input>');
				this.dom.after(this.value);
			}
		}
	}

  init(){
    let {name, readOnly, disabled, mode, dataOptions,value} = this.props;
		if(!name && dataOptions){
			this.props.name = dataOptions.name;
		}
		value=this.target.checked?1:0;
		if(readOnly){
			this.editor.attr('disabled', true);
			this.value.attr('name', this.props.name);
		} else {
			this.editor.attr('name', this.props.name).attr('disabled', disabled || mode === 'view');
		}
  }

	render() {
    let {value, readOnly, mode, className, on, off, hidden,name} = this.props;
    this.target.attr('class', 'x-checkbox-container');
		var checked = this._isChecked(value);
		this.editor[0].checked = this._isChecked(value);
		if(readOnly){
			this.value.val(checked ? on : off);
		}

		this[hidden === true ? 'hide' : 'show']();
		return this;
	}

	hide(){
		this.target.hide();
		return this;
	}
	show(){
		this.target.show();
		return this;
	}

	_handleChange = (e) => {
		var {name, field, on, off} = this.props;
    var value = e.target.checked ? on : off;
    if(field){
      Store.setData(field, value);
    } else if(name){
      Store.setData(name, value);
    } else {
      this.props.value = value;
      this.render();
    }
	}
  _isChecked(value) {
    var {on, off} = this.props;
    if(value == on || value==1) return true;
		if(value == off || value=='' || value==0) return false;
    if(isString(value)){
      return value == on || value.toLowerCase() == on;
    }
    return false;
  }
}
