/*
* 拓展 json editor
* 多语言项的编辑器
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
//import {button} from '../../../lang';
var button=formLang.button;
import {register} from 'json-editor/lib/common/editor';

import DialogBox from './dialogBox';
import Language from './language';

import {getLang} from '../../mixinUtils';

export default class LanguageBox extends Component{
  constructor(props, context){
    super(props, context);
  }

	render(){
		const {value, editor, onChange, ...props} = this.props;
    return (
			<DialogBox editor={editor} label={getLang(button, 'bindingLanguage')} onChange={this._handleChange}>
        <Language data={value} onChange={this._handleChange}></Language>
			</DialogBox>
		);
	}

	_handleChange = (value, oldValue, type) => {
		var {onChange} = this.props;
    if(onChange){
      onChange(value, oldValue, type);
    }
  }
}

register('languageBox', LanguageBox);
