/*
* 显示状态下的表格控件
*/
import React, {Component, PropTypes} from 'react';
import {extend} from '../../../utils';
import classnames from 'classnames';

import {Mode} from '../../../constants';

var button=formLang.button;

import Datagrid from 'datagrid';

import {dataBinding} from '../../mixinUtils';

// display store
import Store from '../../../display/store';

export default class FormDatagrid extends Component{
  static defaultProps = {
    name: '',
    label: '表格',
    idField: 'id',
    method: 'get',
    pageSize: 10,
    multiSelect: false,
    fit: false,
    fitColumns: true,
    toolbar: false,
    inlineEdit: true,
    rowNumber: true,
    rowNumberWidth: 20,
    pagination: true,
    paginationOptions : [10, 20, 30, 40, 50],
    paginationLabel: 'Displaying {start} to {end} of {total} items',
    columns: [],

    toolbarBtn: [
      {type: 'add', text: button.add},
      {type: 'edit', text: button.edit},
      {type: 'remove', text: button.remove},
    ],
  };
  constructor(props, context){
    super(props, context);
    var {value, data, dataInputs} = props;
    value = value || [];
    if(data && data.name && dataInputs){
      var val = dataInputs[data.name];
      if(!val){
        val = [];
        dataInputs[data.name] = val;
      }
      value = val;
    }
    this.state = {value};
  }

  render() {
		let {
			label, dataInputs, data, style, containerStyle, columns, displayMode, toolbar,
			parent, target, col, row, selectKey, listenWindowResize,
			...props
		} = this.props;
    let {value} = this.state;
    if(displayMode && displayMode != Mode.DEFAULT){
      toolbar = false;
    }
		return (
      <Datagrid {...props} data={{rows: value, total: value.length}}
        columns={this._prefixColumns(columns)}
        title={label}
        style={style}
        listenWindowResize={listenWindowResize}
        resizeNow={Store.getData().resizeNow}
        toolbar={toolbar}
				>
			</Datagrid>
		);
	}

  _prefixColumns(columns) {
    var result = [];
    var newCol, editor, newEditor;
    columns.forEach(function(col){
      if(col.hidden) return;
      editor = col.editor;
      newCol = Object.assign({}, col);
      newEditor = extend(true, {}, editor[editor.type + 'Options']);
      newEditor.type = editor.type;
      newCol.editor = newEditor;
      result.push(newCol);
    });
    return result;
  }

	_handleChange = (value) => {
		var {data, dataInputs} = this.props;
    if(data.isComputed) return;
    if(data.name && dataInputs){
			dataInputs[data.name] = dataBinding.getValueForType(data.type, value);
			if(this.props.emitChange){
				this.props.emitChange();
			}
    }
	}
}
