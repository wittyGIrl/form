import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {isNil} from '../../utils';

const Form = (props) => {
	var {title, theme, children, className, style} = props;
	if(isNil(theme)) {
		theme = 'default';
	}
	var componentClass = classnames('form-designer', `theme-${theme}`, className);
	var titleElem;
	if(title){
		titleElem = (
			<h1 className="form-title" key="title">{title.value}</h1>
		);
	}

	return (
		<form className={componentClass} style={style}>
			{titleElem}
			{children}
		</form>
	);
}

export default Form;
