/*
* 拓展 json editor
* 弹出窗口的编辑框
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import Editor from 'editors';

import LinkButton from 'json-editor/lib/common/linkButton';

import Dialog from 'material-ui/Dialog';

export default class DialogBox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  render(){
    const {owner, target, btnTip, label, value, type, editor, subType, onClick, onChange, ...props} = this.props;
    let editorElem = null;
    if(editor && !React.isValidElement(editor)){
      editorElem = (<Editor {...editor} onChange={this._handleChange}/>);
    }
    return (
      <span>
        {editor}
        <LinkButton title={btnTip} onClick={this._handleClick}>
          {label}
        </LinkButton>
        {this._renderDialog()}
      </span>
    );
  }

  _renderDialog(){
    return (
      <Dialog open={this.state.open}
        modal={false}
        autoScrollBodyContent={true}
        onRequestClose={this._handleClose}>
        {this.props.children}
      </Dialog>
    )
  }

  _handleChange = (value, oldValue) => {
    var {onChange} = this.props;
    if(onChange){
      onChange(value, oldValue, 'value');
    }
  }
  _handleBindingChange = (value, oldValue) => {
    var {onChange} = this.props;
    if(onChange){
      onChange(value, oldValue, 'binding');
    }
  }
  _handleClick = (e) => {
    this.setState({open: true});
  }
  _handleClose = (e) => {
    this.setState({open: false});
    if(this.props.onRequestClose){
      this.props.onRequestClose();
    }
  }

}
