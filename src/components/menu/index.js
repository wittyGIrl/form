import React, {Component, PropTypes} from 'react';
//import {menu} from '../../lang';
var menu=formLang.menu;
import {spacing} from '../../theme';

import {grey50, grey200, grey500} from 'material-ui/styles/colors';
import {ListItem} from 'material-ui/List';

import Actions from '../../actions';

import SelectableList from '../common/selectableList';

import History from './history';
import Shortkey from './shortkey';

const styles = {
  list: {
    position: 'absolute',
    height: '100%',
    width: spacing.menuLeft,
    backgroundColor: grey50,
    padding: 0,
  },

  head: {
    position: 'absolute',
    left: spacing.menuLeft,
    top: 0,
    // height: spacing.menuHeadHeight,
    width: spacing.leftbarWidth - spacing.menuLeft - 2 * spacing.menuHeadMargin,
    margin: spacing.menuHeadMargin,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 400,
    color: grey500,
  },
  body: {
    position: 'absolute',
    left: spacing.menuLeft,
    top: spacing.menuHeadHeight,
    width: spacing.leftbarWidth - spacing.menuLeft - 2 * spacing.menuHeadMargin,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: grey200,
  },
};

export default class Menu extends Component{
  _renderBody() {
    var {current, data, placeholder} = this.props;
    switch (current) {
      case 'history':
        return (<History data = {data[current]} placeholder = {placeholder}/>);
      case 'shortkey':
        return (<Shortkey/>);
      default:
        return null;
    }
  }

  render() {
    let {current, title} = this.props;

    return (
      <div>
        <SelectableList defaultValue = {current} onChange = {this._handleMenuSelect}
          style={styles.list}
        >
          <ListItem value="history" primaryText={menu.history} />
          <ListItem value="shortkey" primaryText={menu.shortkey} />
        </SelectableList>
        <div style={styles.head}>
          {title}
        </div>
        <div style={styles.body}>
          {this._renderBody()}
        </div>
      </div>
    );
  }

  _handleMenuSelect = (index) => {
    Actions.menuSelect(index);
  }
}
