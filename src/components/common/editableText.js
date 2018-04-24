import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import options from '../form/options'

export default class EditableText extends Component{
  static propTypes = {
    value: React.PropTypes.string,
    className: React.PropTypes.string,
  };

  constructor(props, context){
    super(props, context);
    this.state = {
      editing: false,
      value: props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.state.value){
      this.setState({
        value: nextProps.value
      });
    }
  }

  componentDidUpdate() {
    if(this.state.editing){
      ReactDOM.findDOMNode(this).focus();
    }
  }

	render() {
    var {editing, value} = this.state;
    var {className} = this.props;
    var cla = classnames(
		   'editable-text',
		   className,
       {input: editing}
		);
    if(editing){
      return (
        <input className={cla} onChange={this._handleChange} onBlur={this._handleBlur} value={value}>
        </input>
      );
    } else {
      return (
        <span className={cla} onDoubleClick={this._handleDoubleClick}>
          {value}
        </span>
      );
    }
	}

  _handleDoubleClick = () => {
    this.oldValue = this.state.value;
    this.setState({editing: true});
    if(this.props.onStartEdit){
      this.props.onStartEdit.call(this, this.state.value);
    }
    options.dataOptions.data.name="";
  }

  // _handleBlur = () => {
  //   this.setState({editing: false});
  //   if(this.props.onEndEdit){
  //     this.props.onEndEdit.call(this, this.state.value, this.oldValue);
  //   }
  // }

  _handleChange = (e) => {
    this.setState({
      value: e.target.value || ''
    });
  }
}
