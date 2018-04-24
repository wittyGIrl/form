/*
* 属性页
*
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import IconButton from 'material-ui/IconButton';
import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import {Tabs, Tab} from 'material-ui/Tabs';

import JsonEditor from 'json-editor';

import Actions from '../actions';

//import {property, button} from '../lang';
var property=formLang.property;
var button=formLang.button;
import {spacing, styles as themeStyles} from '../theme';

import {getLang} from './mixinUtils';

const styles = {
  collapseBtn: {
    position: 'absolute',
    top: 0,
    right: spacing.rightWidth + 100 - 40,
    zIndex: '1000',
    height: 40,
    width: 40,
    padding: '5px',
  },
};

export default class Property extends Component{
  static propTypes = {
    onClick: PropTypes.func,
  }

  constructor(props, context){
    super(props, context);
    this.state = {
      value: 0,
    }
    this.formatter = getLang.bind(null, property);
  }

  render() {
    var {open, data, className, formatter} = this.props;
    var {value} = this.state;
    var componentClass = classnames('Tab', className);

    formatter = formatter || this.formatter;
    var tabs = [];
    if(data && data.length > 0){
      if(value >= data.length){
        value = 0;
      }

      data.forEach(function(tab, index){
        tabs.push(
          <Tab label = {formatter(tab.name)} key = {index} style={themeStyles.tab} value={index}
          >
            <JsonEditor data={tab.data} formatter={formatter}
              onChange={() => Actions.valueChange()}></JsonEditor>
          </Tab>
        );
      });
    }
    let collapseBtn;
    if(open){
      collapseBtn = (
        <IconButton tooltip = {button.collapse} style={styles.collapseBtn}
          onTouchTap = {() => Actions.toggleRight()}>
          <IconChevronRight color="white"/>
        </IconButton>
      );
    }
    return (
      <div>
        <Tabs className={componentClass} value={value}
          inkBarStyle={themeStyles.inkBar} tabItemContainerStyle={themeStyles.tabItemContainer}
          onChange={this._handleTabChange}
        >
          {tabs}
        </Tabs>
        {collapseBtn}
      </div>
    );
  }

  _handleTabChange = (value) => {
    // tabs onChange 会注册到div上，比如，我在tab内的一个input中输入内容，会触发这个onChange事件 material ui的bug
    if(typeof value === 'number'){
      this.setState({value});
    }
  }
}
