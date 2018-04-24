/*
* 编辑状态的col，支持选中等操作
*/
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {isArray, isString, trim} from '../../utils';
import {prefixUnitless} from '../mixinUtils';

import {blue500, lime100} from 'material-ui/styles/colors';
import InkBar from 'material-ui/Tabs/InkBar';

import Actions from '../../actions';
import {Mode} from '../../constants';
import Store from '../../stores';

import {spacing} from '../../theme';

const styles = {
	inkBar: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
};

export default class FormCol extends Component{
	static propTypes = {
		children: PropTypes.node,
	}
	constructor(props, context){
		super(props, context);
		this.state = {
			over: false,
			dragging: false,
		};
	}

	render() {
		let {target, className, width, height, textAlign, children, style, colSpan, rowSpan, type, required} = this.props;
		let {dragging, over} = this.state;

		var attrs = target.getData('attributes');
		style = Object.assign({
			opacity: dragging ? 0.3 : 1,
			backgroundColor: Store.getData().mode.equalTo(Mode.DRAG) && over ? lime100 : null,
			width: prefixUnitless(width),
			height: prefixUnitless(height),
			textAlign,
		}, style);
		var elements = target.getChildren();
		var selected = target.isSelected();
		className = classnames(
			'col', 'drag', className, {
			'plain-text': elements.length === 1 && elements[0].isText(),
			required: required,
			selected,
		});
		if(type){
			className = classnames(className, 'table-field', `level-${type}`);
		}
		var inkbar = null;
		if(selected || target.parent.isSelected()){
			inkbar = (
				<InkBar key="inkbar" left={"0"} width="100%" color={blue500} style={styles.inkBar}/>
			);
		}

		let props = Object.assign({}, target.getPrefixedSpan());

		return (
			<td {...props} className={className}
				style={style}
				onClick={this._handleClick}
				onDoubleClick={this._handleDoubleClick}
				// 	onContextMenu={this._handleContextMenu}
				draggable={true}
				onDragStart={this._handleDragStart}
				onDragEnd={this._handleDragEnd}
				onDragOver={this._handleDragOver}
				onDrop={this._handleDrop}
				onDragEnter={this._handleDragEnter}
				onDragLeave={this._handleDragLeave}
			>
				{children}
				{inkbar}
				{/* <span className="resize-btn" onMouseDown={this._handleResizeMouseDown} onMouseUp={this._handleResizeMouseUp}></span> */}
			</td>
		);
	}

	//选中高亮
	_handleClick = (e) => {
		Actions.select(this.props.target, !e.ctrlKey);
		e.stopPropagation();
	}

	_handleDoubleClick = (e) => {
		Actions.toggleRight(null, this.props.target.getProperty());
		e.stopPropagation();
	}

  _handleContextMenu = (e) => {
    Actions.toggleRightMenu(ReactDOM.findDOMNode(this), this.props.target);
    e.preventDefault();
		// e.stopPropagation();
  }

	_handleDragStart = (event) => {
		this.setState({dragging: true});
		var {target, source} = this.props;
		Actions.startDrag(target, source);
		event.stopPropagation();
	}

	_handleDragEnd = (event) => {
		if(Store.getData().mode.equalTo(Mode.DRAG)){
			Actions.endDrag(false);
		}
		if(this.state.dragging){
			this.setState({dragging: false});
		}
		event.stopPropagation();
	}

  _handleDrop = (event) => {
		if(this.state.dragging)return;
    if(Store.getData().mode.equalTo(Mode.DRAG)){
      Actions.endDrag(this.props.target);
    }
    event.stopPropagation();
  }

  _handleDragEnter = (event) => {
		if(this.state.dragging)return;
    if(Store.getData().mode.equalTo(Mode.DRAG) && !this.state.over){
      this.setState({over: true});
    }
    event.stopPropagation();
  }

  _handleDragLeave = (event) => {
		if(this.state.dragging)return;
    if(this.state.over){
      this.setState({over: false});
    }
    event.stopPropagation();
  }

  _handleDragOver = (event) => {
		if(event.preventDefault){
      event.preventDefault();
    }else{
      event.returnValue = false;
    }
    event.stopPropagation();
  }

	// _handleResizeMouseDown = () => {
	// 	var t = ReactDOM.findDOMNode(this);
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// }
	//
	// _handleResizeMouseUp = () => {
	// 	event.stopPropagation();
	// }
}
