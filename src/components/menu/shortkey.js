import React, {Component, PropTypes} from 'react';

import {List, ListItem} from 'material-ui/List';

//import {shortkey} from '../../lang';
var shortkey=formLang.shortkey;

const styles = {
  listItem: {
    padding: '10px',
    fontSize: '14px',
  },
  list: {
    width: '400px',
  },
};

export default class Shortkey extends Component {
  static defaultProps = {
    data: shortkey.keys,
  }

  render() {
    var {data} = this.props;

    var children = data.map((item, i) => {
      return (
        <ListItem key={i} innerDivStyle={styles.listItem}
          primaryText={
            <div>
              {`${item.value}: ${item.text}`}
            </div>
          }
        />
      );
    });
    return (
      <List style = {styles.list}>
        {children}
      </List>
    );
  }

}
