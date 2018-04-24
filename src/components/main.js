import React, {Component, PropTypes} from 'react';

import Actions from '../actions';

import Constants, {Mode} from '../constants';

import Store from '../stores';

import Right from './right';
import Center from './center';
import Kit from './kit';


import {spacing} from '../theme';

export default class Main extends Component{
  render() {
    let {mode, data, style, property} = this.props;

    return (
      <div className="main">
        <Center data={data} mode={mode}></Center>
        <Kit mode={mode}></Kit>
        <Right open={mode.equalTo(Mode.PROPERTY)} data={property}></Right>
      </div>
    );
  }
}
