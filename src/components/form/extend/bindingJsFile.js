/*
* 拓展 json editor
* 赋给默认值(日期控件)
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

import Datebox from 'editors/lib/editor/datebox';

import {getLang} from '../../mixinUtils';

export default class bindingJsFile extends Component{
  static defaultProps = {
    value: {value:''},
  }
  constructor(props, context){
    super(props, context);
  }
	render(){
	  const {label, value, type, subType, onClick, onChange, ...props} = this.props;
    var styles={width:230+'px'};
    return (
      <span>
        <Editor {...props} style={styles}  value={value.value} onChange={this._handleChange}/>
      </span>
    );
	}
	_handleChange = (value, oldValue) => {
		var {onChange} = this.props;
		this.props.value.value = value;
    if(onChange){
      onChange(value, oldValue, 'value');
    }
  }
}

register('bindingJsFile', bindingJsFile);
