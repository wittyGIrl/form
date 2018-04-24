import React, {Component, PropTypes} from 'react';

import {ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

import Actions from '../../actions';

import SimpleList from '../common/list';

//import {button} from '../../lang'
var button=formLang.button;

export default class History extends Component{
  render() {
    var {data, ...props} = this.props;
    return (
      <div>
        <FlatButton label={button.clearAllDrafts}
          secondary={true}
          disabled={!data || data.length === 0}
          onTouchTap={this._handleClearAll}
        ></FlatButton>
        <SimpleList {...props} data={data} onTouchTap={this._handleTouchTab}>
        </SimpleList>
      </div>
    );
  }

  _handleTouchTab = (data, index) => {
    if(!data.id) return;
    Actions.loadDraft(data.id);
  }

  _handleClearAll = () =>{
    Actions.clearAllDrafts();
  }
}
