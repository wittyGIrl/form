/*
* 块
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {styles} from '../../theme';

import Actions from '../../actions';

import Drop from '../draggable/drop';

import IconContentAdd from 'material-ui/svg-icons/content/add';
import IconContentClear from 'material-ui/svg-icons/content/clear';
import {grey500} from 'material-ui/styles/colors';

import FlatButton from 'json-editor/lib/common/flatButton';
import opts from './options/block'

export default class Block extends Component{

	render(){
		const {textAlign, target, style, children, title} = this.props;
		opts.attributes.id='block_'+(+new Date() * 1e3 + Math.floor(Math.random() * 1e3)).toString(36);
		let isSelected = target.isSelected();
		let borderClass = classnames('block-border', {selected: isSelected});
		return (
			<Drop target={target.children[0]} style={Object.assign({textAlign}, style)}>
				<div className="block-outer" onClick={this._handleClick} onDoubleClick={this._handleDoubleClick}>
					<div className={borderClass}>
						<span className="block-title">{title.value}</span>
						{this._renderToolbar(isSelected)}
						<div className="block-content">
							{children}
						</div>
					</div>
				</div>
			</Drop>
		);
	}

	_renderToolbar(isSelected){
		return (
			<div style={{float: 'right', display: isSelected ? null : 'none'}}>
				<FlatButton style={styles.btn} onClick={this._handleAdd}>
					<IconContentAdd color={grey500} style={styles.svg}></IconContentAdd>
				</FlatButton>
				<FlatButton style={styles.btn} onClick={this._handleRemove}>
					<IconContentClear color={grey500} style={styles.svg}></IconContentClear>
				</FlatButton>
			</div>
		);
	}

	//选中高亮
	_handleClick = (e) => {
		Actions.select(this.props.target, !e.ctrlKey);
	}

	_handleDoubleClick = () => {
		Actions.toggleRight(true, this.props.target.getProperty());
	}

	_handleAdd = () => {
		Actions.add('block', this.props.target.getIndex() + 1);
	}

	_handleRemove = (e) => {
		Actions.remove(this.props.target);
	}
}
