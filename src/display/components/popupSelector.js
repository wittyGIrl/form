import classnames from 'classnames';
import {$, isObject, isNil} from '../../utils'

import Store from '../store';
import Component from './component';

import {getEnvironment} from './mixinUtils';

export default class PopupSelector extends Component{
	static defaultProps = {
    mode: 'default', // default, view, print
	};

  constructor(dom, props, plugin) {
    super(dom, props);
		this.plugin = plugin || 'popupSelector';
		if(this.props.placeholder){
	    this.props.prompt = getEnvironment(this.props.placeholder.binding, this.props.placeholder.value);
	  }
		this.props.readonly = this.props.readOnly;
		if(this._prefixOptions){
			this._prefixOptions();
		}
		this._prefixDataOptions();

		if(this.props.mode === 'default'){
			this.props.onChanged = this._handleChange;
			this.dom.attr('name', this.props.name);
			if(this.props.width === '') this.props.width = 's' - 0;
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
		var {value, text, mode, hidden} = this.props;
		if(mode === 'default'){
			this.rendering = true;
			this.dom[this.plugin]('setValue', value);
			if(!isNil(text)){
				this.dom[this.plugin]('setText', text);
			}
			this.rendering = false;
		} else {
			this.dom.next().html(text || value);
		}
		if(hidden === true) this.hide();
		else this.show();
		return this;
	}
	hide(){
		if(this.props.mode === 'default'){
			this.dom.data('popupSelector').popupSelector.hide();
		} else {
			this.dom.next().hide();
		}
		return this;
	}
	show(){
		if(this.props.mode === 'default'){
			this.dom.data('popupSelector').popupSelector.show();
		} else {
			this.dom.next().show();
		}
		return this;
	}

	_handleChange = (newValue, text) => {
		if(this.rendering)return;
    var {name, field, value} = this.props;
		if(newValue === value)return;
		if(this.rendering)return;
		var {name, field, value} = this.props;
		if(newValue === value)return;
		var others = this.dom.data('popupSelector').options.params;
		var data = Store.getData();
		if(isObject(others)){
			Object.assign(data, others);
		}
		if(field){
			data[field] = newValue;
		} else if(name){
			data[name] = newValue;
		}
		this.props.text = text;
		Store.setData(data);
		if(this.props.onChange){
			this.props.onChange.call(this.dom, newValue, oldValue);
		}
	}
}
