import classnames from 'classnames';
//import {button} from '../../lang';
var button=formLang.button;
import {guid} from '../../utils';

import Store from '../store';
import Component from './component';
import {createComponent} from './index';

import {getEnvironment} from './mixinUtils';


var _plugin = 'datagrid';

const _mapping = {
	textbox: 'LabeledTextbox',
};

const _defaultWinOptions = {
	modal: true,
	minimizable: false,
	collapsible: false,
	onClose(){
		$(this).dialog("destroy");
	}
};

export default class Datagrid extends Component{
	static defaultProps = {
    mode: 'default', // default, view, print
		striped: true,
		inline: false,
		singleSelect: true,
	};

  constructor(target, props) {
    super(target, props);
		this._prefixOptions();
		this._call(this.props);
		this.render();
  }

	_prefixOptions(){
		var {label, toolbar, mode, columns} = this.props;
		if(toolbar === true && mode === 'default'){
			this.props.toolbar = [{
				text: button.add,
				handler: this._handleAdd,
			}, {
				text: button.edit,
				handler: this._handleEdit,
			}, {
				text: button.remove,
				handler: this._handleDelete,
			}];
		} else {
			this.props.toolbar = null;
		}
		this.props.columns = null;
		if(columns){
			var cols = columns.map(function(col){
				col.title = getEnvironment(col.label.binding, col.label.value);
				col.width -= 0;
				return col;
			});
			this.props.columns = [cols];
		}
		this.props.title = getEnvironment(this.props.label.binding, this.props.label.value);
		if(!this.props.name && this.props.dataOptions){
			this.props.name = this.props.dataOptions.name;
		}
		if(!this.props.data){
			var rows = this.props.value;
			if(!rows){
				this.props.value = rows = [];
				Store.getData()[this.props.name] = rows;
			}
			this.props.data = {rows, total: rows.length};
		}
	}

	render() {
		var {value} = this.props;
		this.props.data = {rows: value, total: value.length};
		this._call('loadData', this.props.data);
		this[this.props.hidden === true ? 'hide' : 'show']();
		return this;
	}

	show(){
		this.dom.parent().parent().parent().show();
		return this;
	}

	hide(){
		this.dom.parent().parent().parent().hide();
		return this;
	}

	_handleAdd = (e) => {
		this._openDialog();
	}
	_handleEdit = (e) => {
		var selected = this._call('getSelected');
		if(!selected) return;
		this._openDialog(selected);
		this._editing = selected;
	}
	_handleDelete = (e) => {
		var selected = this._call('getSelected');
		if(!selected) return;
		this._call('deleteRow', this._call('getRowIndex', selected));
	}

	// inline
	_handleInlineAdd = () => {
	}
	_handleInlineEdit = () => {
		var selected = this._call('getSelected');
		if(!selected) return;
	}

	_handleOk = () => {
		var result = $('form', this._dialog).serializeObject();
		if(this._editing){
			Object.assign(this._editing, result);
		} else {
			var {data, idField} = this.props;
			result[idField] = guid();
			data.rows.push(result);
			data.total = data.rows.length;
		}
		this._dialog.dialog('close');
		this._call('loadData', this.props.data);
		this._editing = null;
	}
	_handleCancel = () => {
		this._dialog.dialog('close');
		this._editing = null;
	}

	_openDialog(data){
		this._dialog = $('<div title=" "></div>').appendTo('body');
		this._renderDialog(data);
	}
	_renderDialog(data){
		data = data || {};
		var {columns} = this.props;
		if(columns.length === 0) return;
		columns = columns[0];
		var form = $('<form></form>');
		var container = $('<table class="wit-table" cellspacing="0" cellpadding="5" style="width:100%;"></table>');
		this._dialog.append(form.append(container));
		var tr;
		columns.forEach((col) => {
			if(col.hidden) return;
			tr = $('<tr></tr>').appendTo(container);
			tr.append(`<td>${col.title}</td>`);
			if(!col.editor){
				this._renderEditor(data, col.field, 'textbox', tr);
			} else if(typeof col.editor === 'string'){
				this._renderEditor(data, col.field, col.editor, tr);
			} else {
				this._renderEditor(data, col.field, col.editor.type, tr, col.editor.options);
			}
		}, this);
		var buttons = [
			Object.assign({handler: this._handleOk}, $.buttons.ok),
			Object.assign({handler: this._handleCancel}, $.buttons.cancel),
		];
		this._dialog.dialog(Object.assign(this._getSize(), {buttons}, _defaultWinOptions)).dialog('open');
	}
	_renderEditor(data, name, editorName, container, options){
		var td = $('<td></td>').appendTo(container);
		createComponent(_mapping[editorName], $(`<input name="${name}"/>`).appendTo(td), Object.assign({value: data[name]}, options));
	}
	_getSize(){
		var container = $(window);
		var containerHeight = container.height();
		var containerWidth = container.width();
		var size = {}, ratio = 0.9;
		if (containerHeight > containerWidth) {
			size.width = Math.min(containerWidth * ratio, 800);
			size.height = Math.min(containerHeight * (containerWidth / containerHeight), 800);
		} else {
			size.width = Math.min(containerWidth * (containerWidth / containerHeight), 800);
			size.height = Math.min(containerHeight * ratio, 600);
		}
		return size;
	}

	_call(funcName, params) {
		return this.dom[_plugin](funcName, params);
	}

	_handleChange = (data) => {
    var {name} = this.props;
    if(name) {
      Store.setData(name, value);
    } else {
      this.props.value = value;
      this.render();
    }
		if(this.onChange){
			this.onChange.call(this.dom, value, origin);
		}
	}
}
