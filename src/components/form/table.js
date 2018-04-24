/*
* 块
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

const Table = (props) => {
	return (
		<table style={props.style} className="table" cellSpacing={props.cellspacing} cellPadding={props.cellpadding}>
			<tbody>
				{props.children}
			</tbody>
		</table>
	);
}

export default Table;
