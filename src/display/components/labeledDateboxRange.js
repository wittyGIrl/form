import classnames from 'classnames';
import {$, isObject} from '../../utils'

import Store from '../store';
import Component from './component';

import {getEnvironment} from './mixinUtils';

var _plugin = 'datebox';

export default class LabeledDateboxRange extends Component{
	static defaultProps = {
    mode: 'default', // default, view, print
	};

  constructor(target, props) {
    super(target, props);

		this._create();
  }

	_prefixOptions(){
		if(!isObject(this.props.value)){
			this.props.value = {};
		}
		var {data, value, startPlaceholder, endPlaceholder, readOnly, ...props} = this.props;
		this.start = $.extend({prompt: getEnvironment(startPlaceholder.binding, startPlaceholder.value), readonly: readOnly}, props);
		this.end = $.extend({prompt: getEnvironment(endPlaceholder.binding, endPlaceholder.value), readonly: readOnly}, props);
		this.onChange = this.props.onChange;
		if(data.startData && data.startData.name){
			Object.assign(this.start, {
				name: data.startData.name,
				value: value.start,
				onChange: this._handleChange.bind(this, 'start'),
			});
		}
		if(data.endData && data.endData.name){
			Object.assign(this.end, {
				name: data.endData.name,
				value: value.end,
				onChange: this._handleChange.bind(this, 'end'),
			});
		}

	}

	_create(){
		this.startDom = this.dom;
		this.endDom = $('<input/>');
		this.startDom.after(this.endDom);
		this._prefixOptions();
		this.startDom[_plugin](this.start);
		this.endDom[_plugin](this.end);
	}

	render() {
		var {value} = this.props;
		this.rendering = true;
		this.startDom[_plugin]('setValue', value.start);
		this.endDom[_plugin]('setValue', value.end);
		this.rendering = false;
	}

	_handleChange = (type, newValue, oldValue) => {
		if(this.rendering) return;
		var startName = this.start.name;
		var endName = this.end.name;
		var start, end;
		var start = this._getDate(this.startDom, type === 'start' ? newValue : null);
		var end = this._getDate(this.endDom, type === 'start' ? null : newValue);
		if(start > end){
			var temp = start;
			start = end;
			end = temp;
		}
		start = this._format(this.startDom, start);
		end = this._format(this.endDom, end);
		if(startName || endName) {
			setTimeout(function(){
				var data = {};
				data[startName] = start;
				data[endName] = end;
				Store.setData(data);
			}, 0);
		} else {
			this.props.value = {start, end};
			this.render();
		}
		if(this.onChange){
			this.onChange.call(this.dom, type, start, end);
		}
	}

	_format(target, date){
		var formatter = target[_plugin]('options').formatter;
		if(!date){
			date = new Date();
		}
		return formatter.call(target, date);
	}

	_getDate(target, value){
		var parser = target[_plugin]('options').parser;
		if(!value){
			value = target[_plugin]('getValue');
		}
		return parser.call(target, value);
	}

	getValue(data){
		var value = {};
		if(this.start.name){
			value.start = data[this.start.name];
		}
		if(this.end.name){
			value.end = data[this.end.name];
		}
		return value;
	}
}
