import React, {Component, PropTypes} from 'react';

import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Actions from '../actions';

import MenuStore from '../stores/menuStore';

import Menu from './menu';

import {spacing} from '../theme';

const styles = {
  root: {
    overflow: 'hidden'
  },
};

export default class LeftBar extends Component{
  static defaultProps = {
    open: false,
  };

  render() {
    let {open, menu, title} = this.props;

    return (
      <Drawer
        style = {styles.root}
        width = {spacing.leftbarWidth}
        open = {open}
        docked = {false}
        openRight = {false}
        onRequestChange = {open => Actions.toggleLeft(open.open)}
      >
        <Divider/>

        <Menu {...menu} title={title}/>
      </Drawer>
    );
  }
}
