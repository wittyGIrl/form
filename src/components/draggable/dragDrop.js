import React, {Component, PropTypes} from 'react';

import Drag from './drag';
import Drop from './drop';

export default class DragDrop extends Component {
  static propTypes = {
    dragType: PropTypes.string,
    target: PropTypes.object,
  };

  render() {
    const {children, target, style, ...props} = this.props;
    return(
      <Drag target={target} {...props}>
        <Drop target={target} parent={parent} style={style}>
          {children}
        </Drop>
      </Drag>
    );
  }
}
