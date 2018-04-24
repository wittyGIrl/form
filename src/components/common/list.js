import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {List, ListItem} from 'material-ui/List';

const styles = {
  listItem: {
    padding: '10px',
  },
  list: {
    width: '400px',
  },
};

export default class SimpleList extends Component{
  static propTypes = {
    placeholder: PropTypes.string,
    data: PropTypes.array,
  }

  static defaultProps = {
    placeholder: '这里什么也没有...',
    data: [],
  }

  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    var {data, placeholder} = this.props;
    var children = [];
    var me = this;
    if(data && data.length){
      data.forEach(function(item, i){
        children.push(
          <ListItem key={i} innerDivStyle={styles.listItem} onTouchTap={me._handleTouchTab.bind(me, item, i)}
            primaryText={
              <div>
                <span className = "text-name">{item.text}</span>
                <span className = "text-info">
                  {item.value}
                </span>
              </div>
            }
          />
        );
      });
    } else {
      children.push(
        <ListItem key = {0} innerDivStyle = {styles.listItem}
          primaryText={
            <div>
              <span className = "text-name">{placeholder}</span>
            </div>
          }
        />
      );
    }
    return (
      <List style = {styles.list}>
        {children}
      </List>
    );
  }

  _handleTouchTab = (data, index) => {
    if(this.props.onTouchTap){
      this.props.onTouchTap(data, index);
    }
  }
}
