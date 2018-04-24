/*
* 拓展 json editor
* 基本值外，还提供一个 binding 的 key。当 binding 不为空时，则优先根据 binding 去取值。
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
//import {button, tabs} from '../../../lang';
var button=formLang.button;
var tabs=formLang.tabs;
import {styles} from '../../../theme';
import config from '../../../config';
import Store from '../../../stores';

import Alert from '../../common/alert';

import Editor from 'editors';

import {register} from 'json-editor/lib/common/editor';
import LinkButton from 'json-editor/lib/common/linkButton';

import DialogBox from './dialogBox';
import Variable from './variable';

import {getLang} from '../../mixinUtils';

export default class BindingValueBox extends Component{
  static defaultProps = {
    value: {},
  }

  constructor(props, context){
    super(props, context);
  }

	render(){
	  const {label, value, type, subType, onClick, onChange, ...props} = this.props;
    var editor = (<Editor {...props} type={subType} value={value.value} onChange={this._handleChange}/>);
    return (
      <DialogBox editor={editor} btnTip={getLang(button, 'binding')} label={label} onRequestClose={this._handleClose}>
        <Variable ref="variable" value={value.binding}>
        </Variable>
      </DialogBox>
    );
	}

	_handleChange = (value, oldValue) => {
		var {onChange} = this.props;
		this.props.value.value = value;
    if(onChange){
      onChange(value, oldValue, 'value');
    }
  }

  _handleBindingChange = (value, oldValue) => {
    var {onChange} = this.props;
		this.props.value.binding = `${value}`;
    if(onChange){
      onChange(value, oldValue, 'value');
    }
  }

  _handleClose = () => {
    var {onChange} = this.props;
    var oldValue = this.props.value.binding;
    this.props.value.binding = this.refs.variable.getValue();
    this.props.value.value=this.props.value.binding;
    if(onChange){
      onChange(this.props.value.binding, oldValue, 'binding');
    }
  }
}

register('bindingValueBox', BindingValueBox);
