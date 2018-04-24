import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import Actions from '../../actions';
import Store from '../../stores';
import {Mode} from '../../constants';


export default class Drag extends Component{
  static propTypes = {
    isCloneTarget: PropTypes.bool,
    index: PropTypes.number,
  };

  static defaultProps = {
  };

  constructor(props, context){
    super(props, context);
    this.state = {
      opacity: 1,
    };
  }

  render() {
    let {className, style, target, source, mode, title, children, ...props} = this.props;
    let {opacity} = this.state;
    var componentClass = classnames('drag', className);

    var dragStyle = {
      // boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px',
      opacity: opacity,
    };
    return(
      <div ref="target"
        className={componentClass}
        title={title}
        draggable={true}
        onDragStart={this._handleDragStart}
        onDragEnd={this._handleDragEnd}
        style={Object.assign(dragStyle, style)}>
        {children}
      </div>
    );
  }

  _handleDragStart = (event) => {
    this.setState({opacity: 0.5});
    var {target, source} = this.props;
    Actions.startDrag(target, source);
    event.stopPropagation();
  }

  _handleDragEnd = (event) => {
    if(Store.getData().mode.equalTo(Mode.DRAG)){
      Actions.endDrag(false);
    }
    if(this.state.opacity !== 1){
      this.setState({opacity: 1});
    }
    event.stopPropagation();
  }
}
