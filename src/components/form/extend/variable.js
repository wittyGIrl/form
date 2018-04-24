/*
* 变量选择
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import config from '../../../config';
import {styles} from '../../../theme';
import Store from '../../../stores';
//import {button, tabs} from '../../../lang';
var button=formLang.button;
var tabs=formLang.tabs;
import {Tabs, Tab} from 'material-ui/Tabs';

import Editor from 'editors';

import {getLang} from '../../mixinUtils';

export default class Variable extends Component{
  constructor(props, context){
    super(props, context);
    //var tabValue = 'language', languageValue = '', environmentValue = '', selfValue = '';
    var tabValue = 'environmentValue',  environmentValue = '', selfValue = '';
    if(props.value){
      var value = props.value;
      var index = value.indexOf('.');
      if(~index){
        tabValue = value.substr(0, index);
        if(tabValue === 'language'){
          languageValue = value.substr(index + 1);
        } else if(tabValue === 'environment'){
          environmentValue = value.substr(index + 1);
        } else {
          tabValue = 'self';
          selfValue = value;
        }
      } else {
        tabValue = 'self';
        selfValue = value;
      }
    }
  //  this.state = {tabValue, languageValue, environmentValue, selfValue};
  this.state = {tabValue,  environmentValue, selfValue};
  }

	render(){
    let {languageValue, environmentValue, selfValue, tabValue} = this.state;
		return (
      <Tabs inkBarStyle={styles.inkBar} value={tabValue} tabItemContainerStyle={styles.tabItemContainer}
        onChange={(tabValue) => this.setState({tabValue})}>
        {/*  <Tab label={getLang(tabs, 'language')} key="language" style={styles.tab} value="language">
            <Editor type="combobox" value={languageValue} width="100%" options={getLangOptions()} onChange={this._handleChange}></Editor>
          </Tab>*/}
        <Tab label={getLang(tabs, 'environment')} key="environment" style={styles.tab} value="environment">
          <Editor type="combobox" value={environmentValue} width="100%" options={config.get('binding.environment')} onChange={this._handleChange}></Editor>
        </Tab>
        <Tab label={getLang(tabs, 'self')} key="self" style={styles.tab} value="self">
          <Editor value={selfValue} width="100%" delay={0} onChange={this._handleChange}></Editor>
        </Tab>
      </Tabs>
		);
	}

	_handleChange = (value, oldValue) => {
		var {onChange} = this.props;
    if(this.state.tabValue === 'language'){
      this.setState({languageValue: value});
    } else if(this.state.tabValue === 'environment'){
      this.setState({environmentValue: value});
    } else {
      this.setState({selfValue: value});
    }
  }
  getValue = () => {
    var {tabValue} = this.state;
    if(tabValue === 'language'){
      if(this.state.languageValue){
        return `${tabValue}.${this.state.languageValue}`;
      }
    } else if(tabValue === 'environment'){
      if(this.state.environmentValue){
        return `${tabValue}.${this.state.environmentValue}`;
      }
    } else if(tabValue === 'self'){
      return this.state.selfValue;
    }
    return '';
  }
}

function getLangOptions(){
  var langData = Store.getData().language.langs;
  var lang = config.get('lang');
  var data = langData[lang] || [];
  var options = data.map((item) => {
    return {value: item.name, text: item.name};
  });
  options.unshift({value:'', text:'请选择'});
  return options;
}
