/*
* 拓展 json editor
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {register} from 'json-editor/lib/common/editor';
import LinkButton from 'json-editor/lib/common/linkButton';

export default class Anchor extends Component{

	render(){
		const {owner, target, label, type, subType} = this.props;

    return (
			<LinkButton onClick={this._handleClick}>
				{label}
			</LinkButton>
		);
	}

	_handleClick = (e) => {
		if(this.props.onClick){
			this.props.onClick(this.props);
		}
	}
}

register('a', Anchor);
