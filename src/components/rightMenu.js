import React, {Component, PropTypes} from 'react';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


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

export default class RightMenu extends Component{

  render() {
    let {anchor, disabled} = this.props;
    return (
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        useLayerForClickAway={false}
        onRequestClose={this._handleRequestClose}
      >
        <Menu>
          <MenuItem primaryText="addRow" onTouchTap={this._handleAdd.bind(this, 'row')} disabled={disabled.row}/>
          <MenuItem primaryText="addCol" onTouchTap={this._handleAdd.bind(this, 'col')} disabled={disabled.col}/>
          <MenuItem primaryText="remove" onTouchTap={this._handleRemove} disabled={disabled.remove}/>
          <MenuItem primaryText="merge" onTouchTap={this._handleMerge} disabled={disabled.merge}/>
          <MenuItem primaryText="separate" onTouchTap={this._handleSeparate} disabled={disabled.separate}/>
        </Menu>
      </Popover>
    );
  }

  _handleAdd = (type) => {
    Actions.add(type);
  }

  _handleRemove = () => {
    Actions.Remove();
  }

  _handleMerge = () => {
    Actions.merge();
  }

  _handleSeparate = () => {
    Actions.separate();
  }

  _handleRequestClose = () => {
    Actions.toggleRightMenu();
  }
}
