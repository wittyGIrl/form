import React, {Component, PropTypes} from 'react';

import Drawer from 'material-ui/Drawer';

import Property from './property';

import {spacing} from '../theme';

import Actions from '../actions';

const styles = {
  root: {
    zIndex: 1000,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  overlay: {
    backgroundColor: 'white',
    opacity: 0,
  }
};

export default class Right extends Component{
  static defaultProps = {
  }

  render() {
    let {open, data} = this.props;
    return (
      <Drawer
        className="right"
        style = {styles.root}
        width = {spacing.rightWidth + 100}
        open = {open}
        openSecondary={true}
        onRequestChange = {open => Actions.toggleRight()}
      >
        <Property data={data} open={open}></Property>
      </Drawer>
    );
  }
}
// open: false,
// formatter: formatter,
// onBeforeChange: handleBeforeChange, //return false 该更改会被拒绝。需要返回值，无法debounce
// onChange: jsonEditor.Utils.debounce(handleChange, 1000), //稀释
// onRemoveChild: beforeRemove,
// onAddChild: beforeAdd,
