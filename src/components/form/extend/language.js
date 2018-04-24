/*
* 多语言编辑
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
//import {button} from '../../../lang';
var button=formLang.button;
import config from '../../../config';
import {styles} from '../../../theme';

import {Tabs, Tab} from 'material-ui/Tabs';

import NameValuePairList from './nameValuePairList';

var types = config.get('editors.languageType').options;

export default class Language extends Component{
  constructor(props, context){
    super(props, context);
    let {data} = props;
    types.forEach((type) => {
      if(!data[type.value]){
        data[type.value] = [];
      }
    });
    this.state = {value: 0, data};
  }

	render(){
    let {onChange} = this.props;
    let {value, data} = this.state;
		return (
			<Tabs inkBarStyle={styles.inkBar} value={value} tabItemContainerStyle={styles.tabItemContainer}
        onChange={(value) => this.setState({value})}>
        {
          types.map((type, i) => {
            return (
              <Tab label={type.text} key={type.text} style={styles.tab} value={i}>
      					<NameValuePairList data={data[type.value]} onChange={onChange}
                  onAdd={this._handleAdd} onRemove={this._handleRemove} onNameChange={this._handleNameChange}>
                </NameValuePairList>
      				</Tab>
            );
          })
        }
			</Tabs>
		);
	}

  _handleAdd = () => {
    var {data} = this.state;
    this._each((lang, type) => lang.push({name: '', value: ''}));
    this.setState({data});
  }

  _handleRemove = (index) => {
    var {data} = this.state;
    this._each((lang, type) => lang.splice(index, 1));
    this.setState({data});
  }

  _handleNameChange = (index, value) => {
    var {data} = this.state;
    this._each((lang, type) => lang[index].name = value);
    this.setState({data});
  }

  _each(func){
    var {data} = this.state;
    for(var type in data){
      if(!data.hasOwnProperty(type)) continue;
      func(data[type], type, data);
    }
  }
}
