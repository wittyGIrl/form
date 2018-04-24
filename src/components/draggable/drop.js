import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {lime100} from 'material-ui/styles/colors';

import Actions from '../../actions';
import {Mode} from '../../constants';
import Store from '../../stores';

export default class Drop extends Component{
  static defaultProps = {
  };
  constructor(props, context){
    super(props, context);
    this.state = {
      over: false,
    };
  }

  render() {
    let {className, style, children, ...props} = this.props;
    let {over} = this.state;

    var componentClass = classnames('drop', className);
    style = style || {};
    style = Object.assign({backgroundColor: Store.getData().mode.equalTo(Mode.DRAG) && over ? lime100 : 'white'}, style);

    return (
      <div ref="target" className={componentClass}
        onDragOver ={this._handleDragOver}
        onDrop={this._handleDrop}
        onDragEnter={this._handleDragEnter}
        onDragLeave={this._handleDragLeave}
        style={style}
      >
        {children}
      </div>
    );
  }

  _handleDrop = (event) => {
    if(Store.getData().mode.equalTo(Mode.DRAG)){
      Actions.endDrag(this.props.target);
    }
    event.preventDefault();
    event.stopPropagation();
  }

  _handleDragEnter = (event) => {

    if(Store.getData().mode.equalTo(Mode.DRAG) && !this.state.over){
      this.setState({over: true});
    }
    if(event.stopPropagation)
      event.stopPropagation();
    else
      event.cancelBubble=true;
  }

  _handleDragLeave = (event) => {
    if(this.state.over){
      this.setState({over: false});
    }
    event.stopPropagation();
  }

  _handleDragOver = (event) => {
    event.preventDefault();
    if(event.stopPropagation)
      event.stopPropagation();
    else
      event.cancelBubble=true;
  }
}
