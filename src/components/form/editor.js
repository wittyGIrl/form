import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {isNil, isString, isArray} from '../../utils';

import Editor from 'editors';

export default class FormEditor extends Component{
	static defaultProps = {
		type: 'default',
		name: '',
		id:'',
	};

	render() {
		let {name, id, lable, vertical, dataInputs, data, value, options, style, labelStyle, containerStyle, ...props} = this.props;

		style = Object.assign({}, style);
		containerStyle = Object.assign({}, containerStyle);
		return (
			<Editor {...props} options={options} name={name} id={id} value={value} label="" readOnly={true}
				style={style} containerStyle={containerStyle}>
			</Editor>
		);
	}

	_handleChange = (value) => {
		var {data, dataInputs} = this.props;
		if(data.computed) return;
		if(data.name && dataInputs){
			dataInputs[data.name] = this._getValueForType(data.type, value);
			if(this.props.emitChange){
				this.props.emitChange();
			} else {
				Store.emitChange();
			}
		}
	}

	_compute(data) {
		var {dataInputs} = this.props;
		data = data || this.props.data;
		var hidden, value;
		if(data.hidden){
			try{
				var func = this._getFunction(dataInputs, data.hidden);
				hidden = func(dataInputs);
			} catch(e){
				console.error(`hidden expresssion error, please check data.hidden. ${e.message}`);
			}
		}

		// if(data.computed){
		// 	if(data.expression){
		// 		try{
		// 			var func1 = this._getFunction(dataInputs, data.expression);
		// 			value = func1(dataInputs);
		// 		} catch(e){
		// 			console.error(`expresssion error, please check data.expresssion. ${e.message}`);
		// 		}
		// 	}
		// } else
		if(data.name){
			var val = dataInputs[data.name];
			if(!isNil(val)){
				value = val;
			}
		}
		return {hidden, value};
	}

	_getValueForType(type, value) {
		switch(type){
			case 'bool':
				if(value === 'false') return false;
				return !!value;
			case 'int':
				value = value - 0;
				return isNaN(value) ? 0 : value;
			default:
				return value;
		}
	}

	/*
	* 得到可以执行表达式的函数，带有dataInputs中的数据作为function内部的临时变量
	*/
	_getFunction(dataInputs, expression) {
		var arr = [];
		for(var key in dataInputs){
			if(!dataInputs.hasOwnProperty(key)) continue;
			arr.push(`var ${key} = dataInputs.${key};`);
		}
		arr.push(`return ${expression};`);
		return new Function('dataInputs', arr.join(''));
	}
}
