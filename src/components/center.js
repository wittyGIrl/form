import React, {Component, PropTypes} from 'react';
import {fromJson} from '../jsonConvert.js';

import Actions from '../actions';

import Drop from './draggable/drop';

export default class Center extends Component{
  render() {
    let {data, mode, style} = this.props;
    return (
      <div className="center" style={style} onClick={this._handleClick}>
        {fromJson(data)}
      </div>
    );
  }
  _handleClick=()=>{
    Actions.toggleRight(false);
  }
}
