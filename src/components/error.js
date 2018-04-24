import React, {Component, PropTypes} from 'react';
import {isArray} from '../utils';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Alert from './common/alert';

const styles = {
  actions: {
    textAlign: 'center',
  },
};

export default class ErrorDialog extends Component{
  /*
  * @param  error Array||String
  */
  renderErrors(error) {
    if(!error) return null;
    if(isArray(error)){
      if(error.length === 0)return null;
      var alerts = [];
      error.forEach(function(e, i){
        alerts.push(
          <Alert type="danger" key={i}>{typeof e === 'string' ? e : e.description}</Alert>
        );
      });
      return (
        <div>
          {alerts}
        </div>
      );
    }
    return (
      <Alert type="danger">
        {error}
      </Alert>
    );
  }

  render() {
    let {error} = this.props;
    const actions = (
      <RaisedButton
        label="确定"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this._handleRequestClose}
      />
    );
    return (
      <Dialog
        title="Error"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this._handleRequestClose}
        actionsContainerStyle={styles.actions}
      >
        {this.renderErrors(error)}
      </Dialog>
    );
  }

  _handleRequestClose = () => {
    if(this.props.onClearError){
      this.props.onClearError();
    }
  }
}
