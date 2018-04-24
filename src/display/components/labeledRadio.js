import classnames from 'classnames';
import {$, isNil, isObject} from '../../utils'

import Store from '../store';
import Component from './component';

import {setAttr, getEnvironment} from './mixinUtils';

export default class LabeledRadio extends Component{
	static defaultProps = {
		type: 'default',
		mode: 'default', // default, view, print
		name: null,
    value: '',
    readOnly: null,
    disabled: null,
	};

  constructor(target, props) {
    super(target, props)

		var {value, options} = this.props;
		if(isNil(value)){
			if(options && options.length > 0){
				value = options[0].value;
			} else {
				value = '';
			}
			this.props.value = value;
		}

		this._prefixOptions();
		this._prefixDataOptions();
		this._create();
		this.init();
		this.render();
  }

	_prefixOptions(){
		var options = this.props.options;
		if(options){
			options.forEach((opt) => {
				opt.text = getEnvironment(opt.text.binding, opt.text.value)
			});
		}
	}

  _create(){
    this.dom.hide();
    var {className, readOnly, mode, value, name, options} = this.props;

		var children = [];
		options = options || [];
		options.forEach(function(opt){
			children.push('<label><input type="radio" class="x-editor x-radio" name="');
			children.push(name);
			children.push('" value="');
			children.push(opt.value);
			children.push('" ');
			if(value === opt.value){
				children.push('checked="checked"');
			}
			children.push('></input>');
			if(opt.text){
				children.push(opt.text);
			}
			children.push('</label>');
		});
    this.target = $(`<span></span>`);
    this.target.append(children.join(''));
		this.options = this.target.find('input');
    this.dom.after(this.target);
    if(mode !== 'view'){
			var me = this;
			this.options.each(function(i, item){
				$(item).bind('change', me._handleChange);
			});
			if(readOnly){
				this.value = $('<input type="hidden"></input>');
				this.dom.after(this.value);
			}
    }
  }

  init(){
    let {name, readOnly, disabled, mode, dataOptions} = this.props;
		if(!name && dataOptions){
			name = dataOptions.name;
			this.props.name = dataOptions.name;
		}
		var noedit = mode === 'view';
		var jq;
		this.options.each(function(i, item){
			jq = $(item).attr('name', name);
			jq.attr('disabled', readOnly || disabled || noedit);
		});
		if(readOnly){
			this.value.attr('name', name);
		}
  }

	render() {
    let {value, mode, className, options, readOnly, hidden} = this.props;

    this.target.attr('class', 'x-radio-container');

		var checkedValue;
    this.options.each(function(i, item){
			item.checked = options[i].value === value;
			if(item.checked){
				checkedValue = options[i].value;
			}
		});
		if(readOnly){
			this.value.val(checkedValue);
		}
		if(hidden === true) this.hide();
		else this.show();
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
    var value = e.target.value;
    var {name, field} = this.props;
    if(field){
      Store.setData(field, value);
    } else if(name){
      Store.setData(name, value);
    } else {
      this.props.value = value;
      this.render();
    }
	}
}
